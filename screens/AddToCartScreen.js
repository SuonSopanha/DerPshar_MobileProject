import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator ,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import tw from "twrnc"; // Import tw from twrnc
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";

import { API_URL } from "@env";
import { STRIPE_SERVICE_URL } from "@env";

const AddToCartScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [deliverBy, setDeliverBy] = useState("Pickup");
  const [payBy, setPayBy] = useState("Credit Card");

  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const route = useRoute();
  const product = route.params?.cartData || {};

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (product.length) {
      const mappedProduct = product.map((product) => product.product);
      setCartItems(mappedProduct);
    }
  }, [product]);

  // useEffect(() => {
  //   initializePaymentSheet();
  // },[]);

  // Remove Item from Cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleOrder = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("jwtToken");
      const user_id = await AsyncStorage.getItem("userId");

      if (!token || !user_id) {
        Alert.alert("Error", "Missing token or user ID");
        return;
      }

      if (payBy === "Credit Card") {
        const initializationSuccess = await initializePaymentSheet();
        if (!initializationSuccess) {
          Alert.alert("An Error Ocuured");
          return;
        }

        const isPaySuccess = await openPaymentSheet();
        if (!isPaySuccess) {
          Alert.alert("Payment Cancel");
          return;
        }
      } else if (payBy === "Bank Transfer") {
        console.log("transfer via bank");
      }

      const response = await axios.post(
        `${API_URL}/api/orders`,
        {
          data: {
            city,
            state,
            address,
            phone_number: phoneNumber,
            total_price: parseFloat(calculateTotal),
            deliver_by: deliverBy,
            pay_by: payBy,
            user_id,
            order_status: "pending",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      //loop through the cartItem and post to orderItems
      for (var i = 0; i < cartItems.length; i++) {
        await axios.post(
          `${API_URL}/api/order-items`,
          {
            data: {
              order_id: response.data.data.id,
              product_id: cartItems[i].id,
              quantity: product[i].quantity,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.delete(`${API_URL}/api/carts/${product[i].documentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Alert user on success
      Alert.alert("Success", "Order successfully placed!");
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      console.error(
        "Failed to place order:",
        error.response?.data || error.message
      );

      // Alert user on error
      Alert.alert(
        "Error",
        error.response?.data?.error?.message ||
          "An unexpected error occurred. Please try again."
      );
      setLoading(false);
    }
  };

  const calculateTotal = cartItems
    .reduce(
      (total, item, index) =>
        total + parseFloat(item.price * product[index].quantity),
      0
    )
    .toFixed(2);

  const initializePaymentSheet = async () => {
    try {
      setLoading(true);

      const calculateTotal = cartItems
        .reduce(
          (total, item, index) =>
            total + parseFloat(item.price * product[index].quantity),
          0
        )
        .toFixed(2);
      console.log(calculateTotal);
      // Fetch payment sheet parameters from the backend
      const response = await axios.post(
        `${STRIPE_SERVICE_URL}/create-payment-intent`,
        {
          amount: calculateTotal * 100, // Amount in cents (e.g., $10 = 1000 cents)
          currency: "usd",
        }
      );

      const { paymentIntent, ephemeralKey, customer } = response.data;

      // Initialize the Payment Sheet
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        merchantDisplayName: "Your Business Name",
      });

      if (error) {
        console.error("Payment sheet initialization failed:", error);
        Alert.alert("Error", error.message);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Unable to initialize payment sheet.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    try {
      // Present the Payment Sheet to the user
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error("Payment failed:", error);
        Alert.alert("Error", error.message);
        return false;
      } else {
        Alert.alert("Success", "Your payment was successful!");
        return true;
      }
    } catch (error) {
      console.error("Error presenting payment sheet:", error);
      Alert.alert("Error", "Unable to complete payment.");
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`p-5`}>
      <View style={tw`flex-1 p-5 bg-white`}>
        {/* Heading */}
        <Text style={tw`text-3xl font-semibold text-center mb-6 text-pink-600`}>
          Receipt
        </Text>

        {/* Cart Items */}
        <View style={tw`bg-white shadow-md p-4 rounded-lg mb-6`}>
          {cartItems.map((item, index) => (
            <View
              key={item.id}
              style={tw`flex-row items-center justify-between mb-4`}
            >
              {/* Product Image */}
              <Image
                source={{ uri: item.thumbnail }}
                style={tw`w-16 h-16 rounded-lg`}
                resizeMode="contain"
              />
              {/* Product Details */}
              {/* Product Details */}
              <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-lg font-semibold text-gray-800`}>
                  {item.title}
                </Text>
                <Text style={tw`text-sm text-gray-500`}>
                  ${item.price.toFixed(2)} {/* Adjust formatting as needed */}
                </Text>
              </View>
              <Text style={tw`text-sm text-gray-600`}>
                X{product[index].quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Price */}
        <View style={tw`border-t border-gray-300 pt-4 mt-4`}>
          <Text style={tw`text-xl font-semibold text-gray-800`}>
            Total: ${calculateTotal}
          </Text>
        </View>

        {/* Name Input */}
        <View style={tw`mt-6`}>
          {/* Location Input - City and State */}
          <Text style={tw`text-sm font-semibold text-gray-800`}>Location</Text>
          <View style={tw`flex-row mb-4`}>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mr-2 w-1/2 text-sm bg-gray-100`}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 w-1/2 text-sm bg-gray-100`}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
          </View>

          <Text style={tw`text-sm font-semibold text-gray-800`}>address</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-sm bg-gray-100`}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />

          {/* Phone Number Input */}
          <Text style={tw`text-sm font-semibold text-gray-800`}>
            Phone Number
          </Text>
          <TextInput
            style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-sm bg-gray-100`}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          {/* Deliver By - Radio Buttons */}
          <Text style={tw`text-sm font-semibold text-gray-800`}>
            Deliver By:
          </Text>
          <RadioButton.Group
            onValueChange={(value) => setDeliverBy(value)}
            value={deliverBy}
          >
            <View style={tw`flex-row items-center mb-4`}>
              <RadioButton value="Pickup" color="#ff1493" />
              <Text style={tw`ml-2 text-sm`}>Pickup</Text>
            </View>
            <View style={tw`flex-row items-center mb-4`}>
              <RadioButton value="Home Delivery" color="#ff1493" />
              <Text style={tw`ml-2 text-sm`}>Home Delivery</Text>
            </View>
          </RadioButton.Group>

          {/* Pay By - Radio Buttons */}
          <Text style={tw`text-sm font-semibold text-gray-800`}>Pay By:</Text>
          <RadioButton.Group
            onValueChange={(value) => setPayBy(value)}
            value={payBy}
          >
            <View style={tw`flex-row items-center mb-4`}>
              <RadioButton value="Credit Card" color="#ff1493" />
              <Text style={tw`ml-2 text-sm`}>Credit Card</Text>
            </View>
            <View style={tw`flex-row items-center mb-4`}>
              <RadioButton value="Cash on Delivery" color="#ff1493" />
              <Text style={tw`ml-2 text-sm`}>Cash on Delivery/Pickup</Text>
            </View>
            <View style={tw`flex-row items-center mb-4`}>
              <RadioButton value="Bank Transfer" color="#ff1493" />
              <Text style={tw`ml-2 text-sm`}>Bakong</Text>
            </View>
          </RadioButton.Group>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={tw`p-3 rounded-lg mt-6 ${
              loading ? "bg-gray-400" : "bg-pink-500"
            }`}
            onPress={handleOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={tw`text-white text-lg text-center`}>
                Place Order
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddToCartScreen;
