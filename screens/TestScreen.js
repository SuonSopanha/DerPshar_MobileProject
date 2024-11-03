import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const TestScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      {/* Title Section */}
      <Text style={tw`text-lg font-bold mb-5`}>
        <Text style={tw`italic`}>ABA: </Text>
        <Text style={tw`text-lg text-pink-500 font-bold`}>Der Psa</Text>
      </Text>

      {/* QR Code Section */}
      <View style={tw`mb-5`}>
        <Image
          source={require('../assets/qrcode.png')} 
          style={tw`w-48 h-48`} 
        />
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={tw`bg-pink-500 rounded-full py-3 px-10`}>
        <Text style={tw`text-white font-bold text-lg`}>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestScreen;
