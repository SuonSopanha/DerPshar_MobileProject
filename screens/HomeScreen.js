import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  //categories
  const categories = [
    {
      name: "Electronic",
      icon: <FontAwesome5 name="tv" size={24} color="#FF69B4" />,
    },
    {
      name: "Clothing",
      icon: <MaterialIcons name="checkroom" size={24} color="#FF69B4" />,
    },
    { name: "Kitchen", icon: <Entypo name="bowl" size={24} color="#FF69B4" /> },
    {
      name: "Beauty",
      icon: <FontAwesome5 name="spa" size={24} color="#FF69B4" />,
    },
    {
      name: "Sports",
      icon: <MaterialIcons name="sports-soccer" size={24} color="#FF69B4" />,
    },
  ];

  //categoryMapping
  const categoriesMap = {
    Electronic: [
      "laptops",
      "mobile-accessories",
      "smartphones",
      "mens-watches",
    ],
    Clothing: [
      "mens-shirts",
      "mens-shoes",
      "sunglasses",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
    Kitchen: ["groceries", "kitchen-accessories"],
    Beauty: ["beauty", "fragrances", "skin-care"],
    Sports: ["sports-accessories"],
  };

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  //fetch product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=150"
        );
        const data = await response.json();
        setProductList(data.products);
      } catch (error) {
        setError("Failed to load products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <Text style={tw`text-lg text-red-500`}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      {/* Search Bar */}
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <Text style={tw`text-lg font-semibold text-gray-900`}>
          Welcome, User!
        </Text>
        <TouchableOpacity style={tw`p-2 rounded-full bg-gray-200`}>
          <Text style={tw`text-gray-600`}>👤</Text>
        </TouchableOpacity>
      </View>
      <View
        style={tw`w-full h-24 bg-pink-200 rounded-lg mb-6 flex items-center justify-center`}
      >
        <Text style={tw`text-lg font-bold text-pink-800`}>
          Big Sale - Up to 50% Off!
        </Text>
        <Text style={tw`text-sm text-pink-600`}>On selected items</Text>
      </View>

      <View
        style={tw`flex-row items-center bg-white rounded-full px-4 py-2 shadow-sm mb-6`}
      >
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mb-8`}
      >
        {categories.map((category, idx) => (
          <TouchableOpacity key={idx} style={tw`w-24 items-center mx-2`}>
            <View
              style={tw`w-16 h-16 bg-white rounded-full items-center justify-center shadow-lg mb-2`}
            >
              {category.icon}
            </View>
            <Text style={tw`text-gray-700 text-sm font-semibold`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Sections */}
      {categories.map((category, index) => (
        <View key={index} style={tw`mb-8`}>
          <Text style={tw`text-2xl font-bold text-gray-900 mb-4`}>
            {category.name}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`-mx-2`}
          >
            {productList
              .filter((item) =>
                categoriesMap[category.name].includes(item.category)
              )
              .slice(0, 9) // Display only the first 9 items
              .map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={tw`w-40 bg-white rounded-lg shadow-lg mx-2 p-4`}
                  onPress={() => navigation.navigate("Detail",{
                    item: item
                  })}
                >
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={tw`w-full h-32 rounded-md mb-3`}
                    resizeMode="contain"
                  />
                  <View style={tw`flex-1 justify-between`}>
                    <Text style={tw`text-sm font-semibold text-gray-700`}>
                      {item.title}
                    </Text>
                    <Text style={tw`text-lg font-bold text-pink-500 mt-1`}>
                      ${item.price}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`mt-2 bg-pink-500 py-2 rounded-full`}
                    onPress={() => navigation.navigate("AddToCart")}
                  >
                    <Text style={tw`text-white text-center font-semibold`}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

            {/* Inline "See More" Button if there are more than 9 items */}
            {productList.filter((item) =>
              categoriesMap[category.name].includes(item.category)
            ).length > 9 && (
              <TouchableOpacity
                style={tw`w-40 items-center justify-center bg-gray-200 rounded-xl mx-2 p-4`}
                onPress={() =>
                  navigation.navigate("CategoryDetails", {
                    categoryName: category.name, // Pass category name to filter products in CategoryDetails
                  })
                }
              >
                <Text style={tw`text-pink-500 text-lg font-semibold`}>
                  See More
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
