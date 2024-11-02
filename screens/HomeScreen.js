import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity,Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import tw from 'twrnc';

import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const categories = [
    { name: "Electronic", icon: <FontAwesome5 name="tv" size={24} color="#FF69B4" /> },
    { name: "Clothing", icon: <MaterialIcons name="checkroom" size={24} color="#FF69B4" /> },
    { name: "Kitchen", icon: <Entypo name="bowl" size={24} color="#FF69B4" /> },
    { name: "Beauty", icon: <FontAwesome5 name="spa" size={24} color="#FF69B4" /> },
    { name: "Sports", icon: <MaterialIcons name="sports-soccer" size={24} color="#FF69B4" /> },
  ];

  const products = [
    {
      title: "Electronic",
      items: [
        { name: "OWNTECH", price: "$220", image: require('../assets/owntech.png') },
        { name: "KOLABANK", price: "$120", image: require('../assets/kolabank.png') },
        { name: "iPhone 15", price: "$1420", image: require('../assets/iphone15.png') },
      ],
    },
    {
      title: "Clothing",
      items: [
        { name: "Blue T-shirt", price: "$5", image: require('../assets/tshirt.png') },
        { name: "Jacket", price: "$25", image: require('../assets/jacket.png') },
        { name: "Blue Jeans", price: "$15", image: require('../assets/jean.png') },
      ],
    },
  ];

  const navigation = useNavigation();

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      {/* Search Bar */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text style={tw`text-lg font-semibold text-gray-900`}>Welcome, User!</Text>
        <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
          <Text style={tw`text-gray-600`}>👤</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`w-full h-24 bg-pink-200 rounded-lg mb-6 flex items-center justify-center`}>
        <Text style={tw`text-lg font-bold text-pink-800`}>Big Sale - Up to 50% Off!</Text>
        <Text style={tw`text-sm text-pink-600`}>On selected items</Text>
      </View>

      <View style={tw`flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm mb-6`}>
        <TextInput
          style={tw`flex-1 text-lg text-gray-600`}
          placeholder="Search for products..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={tw`ml-2`}>
          <Text style={tw`text-lg text-gray-500`}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-8`}>
        {categories.map((category, idx) => (
          <TouchableOpacity key={idx} style={tw`w-24 items-center mx-2`}>
            <View style={tw`w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg mb-2`}>
              {category.icon}
            </View>
            <Text style={tw`text-gray-700 text-sm font-semibold`}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Sections */}
      {products.map((productSection, index) => (
        <View key={index} style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>{productSection.title}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-2`}>
            {productSection.items.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={tw`w-40 bg-white rounded-lg shadow-lg mx-2 p-4`}
                onPress={() => navigation.navigate('Detail')}
              >
                <Image
                  source={item.image}
                  style={tw`w-full h-32 rounded-md mb-3`}
                  resizeMode="contain"
                />
                <Text style={tw`text-base font-semibold text-gray-800 mb-1`}>{item.name}</Text>
                <Text style={tw`text-xl font-bold text-pink-500`}>{item.price}</Text>
                <TouchableOpacity style={tw`mt-2 bg-pink-500 py-2 rounded-full`} onPress={() => navigation.navigate('AddToCart')}>
                  <Text style={tw`text-white text-center font-semibold`}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
