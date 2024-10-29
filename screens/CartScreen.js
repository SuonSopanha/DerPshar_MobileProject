import React from 'react';
import { View, Text, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const CartScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-row`}>
        <Image source={require('../assets/logo.jpg')} style={tw`w-12 h-12`} />
        <View style={tw`flex-col ml-2`}>
          <Text style={tw`text-lg font-bold`}>
            Der <Text style={tw`text-pink-500`}>Phsar</Text>
          </Text>
          <Text style={tw`text-[10px] font-semibold italic`}>Everything you need</Text>
        </View>
      </View>

      <View style={tw`flex-row justify-between items-center mt-10`}>
        <View style={tw`flex-row items-center w-full h-26 bg-pink-200 rounded`}>
          <Image source={require('../assets/image.png')} style={tw`w-26 h-26 rounded`} />

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

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default CartScreen;
