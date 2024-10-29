import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const HomeScreen = () => {
  const categories = [
    {
      title: "Electronic",
      items: [
        { name: "OWNTECH", price: "220$", image: require('../assets/owntech.png') },
        { name: "KOLABANK", price: "120$", image: require('../assets/kolabank.png') },
        { name: "Iphone 15", price: "1420$", image: require('../assets/iphone15.png') },
      ],
    },
    {
      title: "Clothing",
      items: [
        { name: "Blue T-shirt", price: "5$", image: require('../assets/tshirt.png') },
        { name: "Jacket", price: "25$", image: require('../assets/jacket.png') },
        { name: "Blue jean", price: "15$", image: require('../assets/jean.png') },
      ],
    },
    {
      title: "Kitchen",
      items: [
        { name: "Pan", price: "10$", image: require('../assets/pan.png') },
        { name: "Pot", price: "30$", image: require('../assets/pot.png') },
        { name: "Spoon", price: "2$", image: require('../assets/spoon.png') },
      ],
    },
  ];

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Search Bar */}
      <View style={tw`flex-row mb-4`}>
        <TextInput style={tw`flex-1 p-2 bg-gray-300 rounded-full`} placeholder="Search" />
        <TouchableOpacity style={tw`p-2 bg-gray-300 rounded-full ml-2`}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Product Categories */}
      {categories.map((category, index) => (
        <View key={index} style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold mb-4`}>{category.title}</Text>
          <View style={tw`flex-row justify-between`}>
            {category.items.map((item, idx) => (
              <View key={idx} style={tw`w-1/3 items-center`}>
                <Image source={item.image} style={tw`w-20 h-20 mb-2`} />
                <Text style={tw`text-lg font-bold`}>{item.name}</Text>
                <Text style={tw`text-pink-600`}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
