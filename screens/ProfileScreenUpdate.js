import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import tw from "twrnc"; // Import tw from twrnc
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";

import { API_URL } from "@env";
const ProfileScreenUpdate = () => {
  const historyData = [
    { id: "1", date: "17/Jul/2024", amount: "$120.00", status: "Completed" },
    { id: "2", date: "18/Jul/2024", amount: "$85.50", status: "Pending" },
    { id: "3", date: "19/Jul/2024", amount: "$50.00", status: "Cancelled" },
    { id: "3", date: "19/Jul/2024", amount: "$50.00", status: "Paid" },
  ];

  const navigation = useNavigation();
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      timeZone: "Asia/Phnom_Penh", // Set timezone to Phnom Penh
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const fetchUser = async () => {
    const userName = await AsyncStorage.getItem("userName");
    setUser(userName);
  };

  const fetchOrder = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    const userId = await AsyncStorage.getItem("userId");

    try {
      setLoading(true);
      setOrderList([]);

      const response = await axios.get(
        `${API_URL}/api/orders?filters[user_id][$eq]=${userId}&sort=createdAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderList(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching carts:", error);
      setError("Failed to load cart. Please try again.");
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchOrder();
    }, [])
  );

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
        <Text>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={tw`p-4 mb-4 bg-white rounded-lg shadow-md`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-gray-600 text-sm`}>Date:</Text>
        <Text style={tw`text-gray-800 text-sm font-bold`}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-gray-600 text-sm`}>Total Price:</Text>
        <Text style={tw`text-gray-800 text-sm font-bold`}>
          ${item.total_price}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-gray-600 text-sm`}>Status:</Text>
        <Text
          style={tw.style(
            `text-sm font-bold`,
            item.status === "Completed" && `text-green-600`,
            item.pay_by === "Credit Card" && `text-blue-600`,
            item.status === "Pending" && `text-yellow-500`,
            item.status === "Cancelled" && `text-red-600`
          )}
        >
          {item.pay_by === "Credit Card" ? "Paid" : item.status}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`bg-pink-500 rounded px-4 py-2 self-end`}
        onPress={() =>
          navigation.navigate("OrderDetail", {
            order: item,
          })
        }
      >
        <Text style={tw`text-white text-sm font-bold`}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-6`}>
      {/* Profile Section */}
      <View style={tw`items-center mb-6`}>
        <View
          style={tw`w-24 h-24 rounded-full border-2 border-gray-400 justify-center items-center`}
        >
          {/* Placeholder for Profile Image */}
          <Text style={tw`text-4xl text-gray-400`}>👤</Text>
        </View>
        <Text style={tw`text-xl font-bold mt-4`}>{user}</Text>
      </View>

      {/* History Section */}
      <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>
        Order History
      </Text>
      <FlatList
        data={orderList}
        renderItem={renderItem}
        keyExtractor={(item) => item.documentId}
        contentContainerStyle={tw`pb-6`} // Adding padding for spacing
      />
    </View>
  );
};

export default ProfileScreenUpdate;
