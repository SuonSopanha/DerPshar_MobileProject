import React from 'react';
import { View, Text, Image, ScrollView, StatusBar } from 'react-native';
import tw from 'twrnc';

const ProductDetailScreen = () => {
  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
    <View style={tw`flex-row`}>
      <Image
          source={require('../assets/logo.jpg')} // Replace with your logo URL or local image
          style={tw`w-12 h-12`}
        />
        <View style={tw`flex-col ml-2`}>
      <Text style={tw`text-lg font-bold`}>Der <Text style={tw`text-pink-500`}>Phsar</Text></Text>
      <Text style={tw`text-[10px] font-semibold italic `}>Everthing you need</Text>
      </View>
    </View>
    
      {/* Brand and Logo Section */}
      <View style={tw`flex-row justify-between items-center mb-5`}>
        <Text style={tw`w-14`}></Text>
        <View style={tw`flex-col items-center`}>
          <Text style={tw`text-lg italic`}>Brand</Text>
          <Text style={tw`text-xl font-bold`}>OWNTECH</Text>
        </View>
        {/* Star Background */}
        <View style={tw`relative flex justify-center items-center`}>
          <Image
            source={require('../assets/VectorStar.png')} // Replace with your star image path
            style={tw`w-16 h-16`} // Adjust the size of the star as needed
          />
          <Text style={tw`absolute text-xl font-bold text-red-500`}>
            220$
          </Text>
        </View>

      </View>

      {/* Product Image */}
      <View style={tw`items-center mb-5`}>
        <Image
          source={require('../assets/image.png')} // Replace with your product image URL or local image
          style={tw`w-48 h-48`}
        />
      </View>

      {/* Product Details */}
      <View style={tw`mt-5`}>
        {/* Menu Language */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Menu language</Text>
          <Text style={tw`text-base font-bold flex-1`}>Multiple languages</Text>
        </View>

        {/* Operation Mode */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Operation mode</Text>
          <Text style={tw`text-base font-bold flex-1`}>touch + button</Text>
        </View>

        {/* Product Size */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Product size</Text>
          <Text style={tw`text-base font-bold flex-1`}>4.8×3.0×4.3 cm</Text>
        </View>

        {/* Wristband Material */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Wristband material</Text>
          <Text style={tw`text-base font-bold flex-1`}>silicone</Text>
        </View>

        {/* Product Weight */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Product weight</Text>
          <Text style={tw`text-base font-bold flex-1`}>0.98 (lb)</Text>
        </View>

        {/* Packing List */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Packing list</Text>
          <Text style={tw`text-base font-bold flex-1`}>
            phone head + free watch strap + charging cable + instruction manual
          </Text>
        </View>

        {/* Strap Style */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Strap style</Text>
          <Text style={tw`text-base font-bold flex-1`}>classic buckle</Text>
        </View>

        {/* Function */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Function</Text>
          <Text style={tw`text-base font-bold flex-1`}>
            sleep monitoring, exercise detection, health detection
          </Text>
        </View>

        {/* Colour */}
        <View style={tw`flex-row justify-between mb-3`}>
          <Text style={tw`text-base text-gray-500 flex-1 pr-2`}>Colour</Text>
          <Text style={tw`text-base font-bold flex-1`}>Black</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default ProductDetailScreen;
