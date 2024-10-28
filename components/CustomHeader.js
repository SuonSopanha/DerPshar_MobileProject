import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc'; // Import tailwind styles if using

const CustomHeader = () => {
  return (
    <View style={tw`flex-row items-center bg-white py-2 px-4 shadow`}>
      <Image
        source={require('../assets/logo.jpg')} // Replace with your logo URL or local image
        style={tw`w-12 h-12`}
      />
      <View style={tw`ml-2`}>
        <Text style={tw`text-lg font-bold`}>
          Der <Text style={tw`text-pink-500`}>Phsar</Text>
        </Text>
        <Text style={tw`text-[10px] font-semibold italic`}>
          Everything you need
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
