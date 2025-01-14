import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const CategoryDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryName } = route.params; // Get category name from navigation params

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoriesMap = {
    Electronic: ["laptops", "mobile-accessories", "smartphones", "mens-watches"],
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=150"
        );
        const data = await response.json();

        // Filter products based on the category name
        const filteredProducts = data.products.filter((product) =>
          categoriesMap[categoryName]?.includes(product.category)
        );

        setProducts(filteredProducts);
      } catch (error) {
        setError("Failed to load category products");
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

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
    <ScrollView style={tw`flex-1 bg-gray-50`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-3xl font-extrabold text-gray-900 mb-6`}>
          {categoryName} Products
        </Text>
        <View style={tw`flex-row flex-wrap -mx-2`}>
          {products.map((product, idx) => (
            <TouchableOpacity
              key={idx}
              style={tw`w-1/2 px-2 mb-6`}
              onPress={() => navigation.navigate("Detail", { item: product })}
            >
              <View style={tw`bg-white rounded-lg shadow-lg p-4`}>
                <Image
                  source={{ uri: product.thumbnail }}
                  style={tw`w-full h-36 rounded-md mb-4`}
                  resizeMode="contain"
                />
                <View>
                  <Text
                    style={tw`text-sm font-medium text-gray-800 mb-1`}
                    numberOfLines={2}
                  >
                    {product.title}
                  </Text>
                  <Text style={tw`text-lg font-bold text-pink-500`}>
                    ${product.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={tw`mt-4 bg-pink-500 py-2 rounded-full shadow-md`}
                >
                  <Text style={tw`text-white text-center font-semibold`}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryDetails;
