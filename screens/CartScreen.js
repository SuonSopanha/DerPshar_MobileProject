import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const CartScreen = () => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row justify-between items-center`}>

        <View style={tw`flex-row items-center w-full h-26 bg-pink-200 rounded`}>
          {/* Custom Checkbox */}
          <TouchableOpacity
          onPress={() => setIsSelected(!isSelected)}
          style={tw`ml-2 w-7 h-7 border-2 rounded-md ${
            isSelected ? 'bg-pink-500 border-pink-500' : 'bg-white border-gray-400'
          } flex items-center justify-center`}
        >
          {isSelected && <Ionicons name="checkmark" size={20} color="white" />}
        </TouchableOpacity>
          <Image source={require('../assets/image.png')} style={tw`ml-2 w-20 h-20 rounded`} />

          <View style={tw`flex-col ml-4 flex-1`}>
            <Text style={tw`text-lg font-bold mb-4`}>OWNTECH</Text>
            
            <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
              <View style={tw`rounded bg-white p-2 items-center w-20`}>
                <Text style={tw`text-xs font-semibold`}>Details</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={tw`relative flex justify-center items-center ml-4`}>
            <Image source={require('../assets/VectorStar.png')} style={tw`w-16 h-16`} />
            <Text style={tw`absolute text-xl font-bold text-red-500`}>220$</Text>
          </View>
        </View>

      </View>
      <View style={tw` items-center mb-10 mt-10`}>
          <TouchableOpacity
            style={tw` bg-pink-500 py-2 px-6 rounded shadow-lg text-center items-center`}
            onPress={() => navigation.navigate('Payment')} // Use navigation to go to CartScreen
          >
            <Text style={tw`text-white font-semibold text-base`}>Buy Now</Text>
          </TouchableOpacity>
        </View>

      {/* <StatusBar style="auto" /> */}
    </ScrollView>
  );
};

export default CartScreen;
