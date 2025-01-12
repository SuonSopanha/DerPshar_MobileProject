import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

const InvoiceScreen = () => {
  const invoiceDetails = {
    date: "17/Jul/2024  9:36 AM",
    customer: "LENG Kola",
    items: [{ description: "OWNTECH", unitCost: 220, qty: 1, total: 220 }],
    total: 220,
    paidBy: "ABA Bank",
    deliver: "Virak Buntham Express",
    location: "Takmao, Phnom Penh",
    phoneNumber: "088 356 2536",
  };

  const [user,setUser] = useState("")
  const [orderItem,setOrderItem] = useState([])
  const [item,setItem] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const route = useRoute();
  const order = route.params?.order || {};


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
      setOrderItem([]); // Clear existing items
      setItem([]); // Clear existing items
  
      // Fetch order items
      const response = await axios.get(
        `${API_URL}/api/order-items?filters[order_id][$eq]=${order.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const fetchedOrderItems = response.data.data; // Assuming this contains an array
      setOrderItem(fetchedOrderItems);
  
      // Fetch product details for each order item
      const fetchedItems = await Promise.all(
        fetchedOrderItems.map(async (orderItem) => {
          const productResponse = await fetch(
            `https://dummyjson.com/products/${orderItem.product_id}`
          );
          return productResponse.json(); // Return the fetched product data
        })
      );
  
      // Set the item state with the fetched product details
      setItem(fetchedItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching carts:", error);
      setError("Failed to load cart. Please try again.");
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUser()
    fetchOrder()
  },[])

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      {/* Header Section */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Date</Text>
        <Text style={tw`text-gray-700`}>{formatDate(order.createdAt)}</Text>
        <Text style={tw`text-lg font-bold mt-2`}>Customer</Text>
        <Text style={tw`text-gray-700`}>{user}</Text>
      </View>

      {/* Table Header */}
      <View style={tw`flex-row bg-pink-200 rounded-md px-4 py-2 mb-2`}>
        <Text style={tw`flex-1 text-center font-bold`}>Description</Text>
        <Text style={tw`w-20 text-center font-bold`}>Unit Cost</Text>
        <Text style={tw`w-12 text-center font-bold`}>QTY</Text>
        <Text style={tw`w-20 text-center font-bold`}>Total</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={item}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
          <View style={tw`flex-row px-4 py-2 border-b border-gray-200`}>
            <Text style={tw`flex-1 text-center`}>{item.title}</Text>
            <Text style={tw`w-20 text-center`}>{item.price}</Text>
            <Text style={tw`w-12 text-center`}>{orderItem[index].quantity}</Text>
            <Text style={tw`w-20 text-center`}>{(item.price * orderItem[index].quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      {/* Total Section */}
      <View style={tw`flex-row justify-end items-center mt-4`}>
        <Text style={tw`text-xl font-bold`}>Total</Text>
        <Text style={tw`text-xl font-bold ml-4 text-pink-500`}>
          {order.total_price} $
        </Text>
      </View>

      {/* Footer Section */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Paid By: </Text>
          {order.pay_by}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Deliver: </Text>
          {order.deliver_by}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Location: </Text>
          {order.city},{order.state}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Phone Number: </Text>
          {order.phone_number}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceScreen;
