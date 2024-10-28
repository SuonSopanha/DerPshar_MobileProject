import React from 'react';
import { View, Text, Image, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

const CartScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Header with Logo */}
      <View style={tw`flex-row`}>
        <Image
          source={require('../assets/logo.jpg')} // Replace with your logo URL or local image
          style={tw`w-12 h-12`}
        />
        <View style={tw`flex-col ml-2`}>
          <Text style={tw`text-l font-bold`}>
            Der <Text style={tw`text-pink-500`}>Phsar</Text>
          </Text>
          <Text style={tw`text-[10px] font-semibold italic`}>
            Everything you need
          </Text>
        </View>
      </View>

      {/* Cart Item */}
      <View style={tw`flex-row justify-between items-center mt-10`}>
        <View style={tw`flex-row items-center w-full h-26 bg-pink-200 rounded`}>
          {/* Product Image */}
          <Image
            source={require('../assets/image.png')} // Replace with your product image path
            style={tw`w-26 h-26 rounded`}
          />
          {/* Product Info */}
          <View style={tw`flex-col ml-4 flex-1`}>
            <Text style={tw`text-lg font-bold mb-4`}>OWNTECH</Text>
            <View style={tw`rounded bg-white p-2 items-center w-20`}>
              <Text style={tw`text-xs font-semibold`}>Details</Text>
            </View>
          </View>
          {/* Price with Star Background */}
          <View style={tw`relative flex justify-center items-center ml-4`}>
            <Image
              source={require('../assets/VectorStar.png')} // Replace with your star image path
              style={tw`w-16 h-16`} // Adjust the size of the star as needed
            />
            <Text style={tw`absolute text-xl font-bold text-red-500`}>
              220$
            </Text>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default CartScreen;
