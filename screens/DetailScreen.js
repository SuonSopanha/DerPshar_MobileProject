import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('black');
  const [showMore, setShowMore] = useState(false);

  const productAttributes = [
    { label: "Menu language", value: "Multiple languages" },
    { label: "Operation mode", value: "Touch + Button" },
    { label: "Product size", value: "4.8×3.0×4.3 cm" },
    { label: "Wristband material", value: "Silicone" },
    { label: "Product weight", value: "0.98 lb" },
    { label: "Packing list", value: "Phone head + Free watch strap + Charging cable + Instruction manual" },
    { label: "Strap style", value: "Classic buckle" },
    { label: "Function", value: "Sleep monitoring, Exercise detection, Health detection" },
    { label: "Colour", value: "Black" },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Header */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/Back.png')}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={tw`items-center mb-5`}>
        <Image
          source={require('../assets/image.png')}
          style={tw`w-64 h-64 rounded-3xl`}
        />
      </View>

      {/* Product Title and Price */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-2xl font-bold`}>OWNTECH</Text>
        <View style={tw`relative flex justify-center items-center`}>
          <Image source={require('../assets/VectorStar.png')} style={tw`w-16 h-16`} />
          <Text style={tw`absolute text-2xl font-bold text-red-500`}>290$</Text>
        </View>
      </View>

      {/* Color Options */}
      <View style={tw`flex-row mb-4`}>
        {['black', 'white'].map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            style={tw`w-10 h-10 border-2 rounded-full mr-2 ${selectedColor === color ? 'border-pink-500' : 'border-pink-100'} bg-${color}`}
          />
        ))}
      </View>

      {/* Product Details */}
      <View style={tw`bg-white rounded-md shadow-sm p-4 mb-6`}>
        <Text style={tw`text-xl font-bold mb-4 text-center text-gray-800`}>Product Detail</Text>
        
        {productAttributes.slice(0, showMore ? productAttributes.length : 2).map((item, index) => (
          <View key={index} style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-base text-gray-600 flex-1 pr-4`}>{item.label}</Text>
            <Text style={tw`text-base font-semibold text-gray-800 flex-1 text-right`}>{item.value}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={() => setShowMore(!showMore)} style={tw`mt-4`}>
          <Text style={tw`text-pink-500 font-semibold text-center`}>
            {showMore ? 'See Less' : 'See More'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Size Options */}
      <View style={tw`flex-row justify-between mb-6`}>
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size)}
            style={tw`w-12 h-12 rounded-lg border-2 items-center justify-center ${selectedSize === size ? 'bg-pink-300 border-pink-500' : 'bg-white border-pink-300'}`}
          >
            <Text style={tw`${selectedSize === size ? 'text-white' : 'text-pink-500'} font-bold`}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 py-4 rounded-full shadow-lg mb-10`}
        onPress={() => navigation.navigate('AddToCart')}
      >
        <Text style={tw`text-white font-semibold text-base text-center`}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetailScreen;
