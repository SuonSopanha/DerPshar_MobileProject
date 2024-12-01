import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import tw from "twrnc";

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

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      {/* Header Section */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold`}>Date</Text>
        <Text style={tw`text-gray-700`}>{invoiceDetails.date}</Text>
        <Text style={tw`text-lg font-bold mt-2`}>Customer</Text>
        <Text style={tw`text-gray-700`}>{invoiceDetails.customer}</Text>
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
        data={invoiceDetails.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={tw`flex-row px-4 py-2 border-b border-gray-200`}>
            <Text style={tw`flex-1 text-center`}>{item.description}</Text>
            <Text style={tw`w-20 text-center`}>{item.unitCost}</Text>
            <Text style={tw`w-12 text-center`}>{item.qty}</Text>
            <Text style={tw`w-20 text-center`}>{item.total}</Text>
          </View>
        )}
      />

      {/* Total Section */}
      <View style={tw`flex-row justify-end items-center mt-4`}>
        <Text style={tw`text-xl font-bold`}>Total</Text>
        <Text style={tw`text-xl font-bold ml-4 text-pink-500`}>
          {invoiceDetails.total} $
        </Text>
      </View>

      {/* Footer Section */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Paid By: </Text>
          {invoiceDetails.paidBy}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Deliver: </Text>
          {invoiceDetails.deliver}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Location: </Text>
          {invoiceDetails.location}
        </Text>
        <Text style={tw`text-gray-700`}>
          <Text style={tw`font-bold`}>Phone Number: </Text>
          {invoiceDetails.phoneNumber}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceScreen;
