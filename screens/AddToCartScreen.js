import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import tw from "twrnc"; // Import tw from twrnc

const AddToCartScreen = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [deliverBy, setDeliverBy] = useState("Pickup");
  const [payBy, setPayBy] = useState("Credit Card");

  const handleAddToCart = () => {
    console.log({
      name,
      city,
      state,
      phoneNumber,
      totalAmount,
      deliverBy,
      payBy,
    });
  };

  return (
    <View style={tw`flex-1 p-5 justify-center`}>
      {/* Product Image */}
      <Image
        source={require("../assets/watch.jpg")}
        style={tw`w-full h-40 mb-5`}
        resizeMode="contain"
      />

      {/* Name Input */}
      <Text style={tw`text-xs mb-1`}>Name</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-1 bg-gray-200 text-xs h-8`}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Location Input - City and State */}
      <Text style={tw`text-xs mb-2`}>Location</Text>
      <View style={tw`flex-row mb-1`}>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2 mr-2 flex-1 bg-gray-200 text-xs h-8`}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2 flex-1 bg-gray-200 text-xs h-8`}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
      </View>

      {/* Phone Number Input */}
      <Text style={tw`text-xs mb-1`}>Phone Number</Text>
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-1 bg-gray-200 text-xs h-8`}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Total Amount Input and Price Display */}
      <Text style={tw`text-xs mb-1`}>Total Amount</Text>
      <View style={tw`flex-row items-center justify-between mb-1`}>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-2 flex-1 bg-gray-200 text-xs h-8`}
          placeholder="Enter total amount"
          keyboardType="numeric"
          value={totalAmount}
          onChangeText={setTotalAmount}
        />
        <Text style={tw`text-xs ml-3`}>Total Price: ${totalAmount}</Text>
      </View>

      {/* Deliver By - Radio Buttons */}
      <Text style={tw`text-xs mb-1`}>Deliver By:</Text>
      <RadioButton.Group
        onValueChange={(value) => setDeliverBy(value)}
        value={deliverBy}
      >
        <View style={tw`flex-row items-center `}>
          <RadioButton value="Pickup" color="#ff1493" />
          <Text style={tw`ml-2 text-xs`}>Pickup</Text>
        </View>
        <View style={tw`flex-row items-center `}>
          <RadioButton value="Home Delivery" color="#ff1493" />
          <Text style={tw`ml-2 text-xs`}>Home Delivery</Text>
        </View>
      </RadioButton.Group>

      {/* Pay By - Radio Buttons */}
      <Text style={tw`text-xs mb-1`}>Pay By:</Text>
      <RadioButton.Group onValueChange={(value) => setPayBy(value)} value={payBy}>
        <View style={tw`flex-row items-center`}>
          <RadioButton value="Credit Card" color="#ff1493" />
          <Text style={tw`ml-2 text-xs`}>Credit Card</Text>
        </View>
        <View style={tw`flex-row items-center `}>
          <RadioButton value="Cash on Delivery" color="#ff1493" />
          <Text style={tw`ml-2 text-xs`}>Cash on Delivery</Text>
        </View>
        <View style={tw`flex-row items-center `}>
          <RadioButton value="Bank Transfer" color="#ff1493" />
          <Text style={tw`ml-2 text-xs`}>Bank Transfer</Text>
        </View>
      </RadioButton.Group>

      {/* Add to Cart Button */}
      <TouchableOpacity style={tw`bg-pink-500 p-3 rounded-lg mt-3`} onPress={handleAddToCart}>
        <Text style={tw`text-white text-base text-center`}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToCartScreen;
