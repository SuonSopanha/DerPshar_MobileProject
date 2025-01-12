import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { RadioButton } from "react-native-paper";
import tw from "twrnc"; // Import tw from twrnc

const ProfileScreenUpdate = () => {
  const historyData = [
    { id: '1', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
    { id: '2', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
    { id: '3', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
  ];

  const renderItem = ({ item }) => (
    <View style={tw`flex-row justify-between items-center px-4 py-2 border-b border-gray-200`}>
      <Text style={tw`text-sm`}>{item.date}</Text>
      <Text style={tw`text-sm flex-1 px-2`}>{item.details}</Text>
      <TouchableOpacity style={tw`bg-pink-500 rounded px-3 py-1`}>
        <Text style={tw`text-white text-sm`}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      {/* Profile Section */}
      <View style={tw`items-center mb-6`}>
        <View style={tw`w-24 h-24 rounded-full border-2 border-gray-400 justify-center items-center`}>
          {/* Placeholder for Profile Image */}
          <Text style={tw`text-4xl text-gray-400`}>👤</Text>
        </View>
        <Text style={tw`text-xl font-bold mt-4`}>LENG Kola</Text>
        <Text style={tw`text-gray-600`}>088 356 2536</Text>
      </View>

      {/* History Section */}
        <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>History</Text>
        <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-6`} // Adding padding for spacing
        />

    </View>
  );
};

export default ProfileScreenUpdate;
