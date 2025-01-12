import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { API_URL } from "@env";

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCarts = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    const userId = await AsyncStorage.getItem("userId");
    try {
      setLoading(true);
      setProducts([]); // Clear previous products to avoid duplicates
      const response = await axios.get(
        `${API_URL}/api/carts?filters[user_id][$eq]=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartList(response.data.data);
      for (let cart of response.data.data) {
        await fetchProducts(cart.product_id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching carts:", error);
      setError("Failed to load cart. Please try again.");
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCarts();
    }, [])
  );

  const prepareOrder = () => {
    const combinedCartList = cartList.map((cartItem) => ({
      ...cartItem,
      product: products.find((product) => product.id === cartItem.product_id),
    }));

    navigation.navigate("Order", { cartData: combinedCartList });
  };

  const removeFromCart = async (id, document_id) => {
    setCartList((prev) =>
      prev.filter((cartItem) => cartItem.product_id !== id)
    );
    setProducts((prev) => prev.filter((product) => product.id !== id));

    const token = await AsyncStorage.getItem("jwtToken");

    await axios.delete(`${API_URL}/api/carts/${document_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <Text>{error}</Text>
      </View>
    );
  }

  const increaseQuantity = (id) => {
    setCartList((prev) =>
      prev.map((product) =>
        product.product_id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartList((prev) =>
      prev.map((product) =>
        product.product_id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {products?.map((product, index) => (
        <View key={index} style={tw`bg-pink-100 rounded-lg mb-4 p-3 shadow-sm`}>
          <View style={tw`flex-row items-center`}>
            <Image
              source={{ uri: product.thumbnail }}
              style={tw`w-16 h-16 rounded`}
            />
            <View style={tw`flex-1 ml-4`}>
              <Text style={tw`text-base font-semibold text-gray-800`}>
                {product.title}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
                <Text style={tw`text-xs text-pink-500 mt-1`}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`flex-row items-center justify-between mt-4`}>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                onPress={() => decreaseQuantity(product.id)}
                style={tw`bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center`}
              >
                <Ionicons name="remove" size={18} color="#333" />
              </TouchableOpacity>

              <Text style={tw`text-sm font-bold`}>
                {cartList[index]?.quantity || 1}
              </Text>

              <TouchableOpacity
                onPress={() => increaseQuantity(product.id)}
                style={tw`bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center`}
              >
                <Ionicons name="add" size={18} color="#333" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Remove Item",
                    "Are you sure you want to remove this item from the cart?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Remove",
                        onPress: () =>
                          removeFromCart(product.id, cartList[index].documentId),
                      },
                    ]
                  )
                }
                style={tw`ml-2`}
              >
                <Ionicons name="trash" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>

            <Text style={tw`text-sm font-bold text-red-500`}>
              $
              {(
                (cartList[index]?.quantity > 0
                  ? product.price * cartList[index]?.quantity
                  : product.price) || 0
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      ))}

      <View style={tw`items-center mb-10 mt-10`}>
        <TouchableOpacity
          style={tw`bg-pink-500 py-3 px-6 rounded-lg shadow-lg`}
          onPress={prepareOrder}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CartScreen;
