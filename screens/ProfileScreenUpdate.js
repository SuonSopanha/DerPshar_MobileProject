import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

const ProfileScreenUpdate = () => {
  const historyData = [
    { id: '1', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
    { id: '2', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
    { id: '3', date: '17/Jul/2024', details: 'OWNTECH, Phone, ...' },
  ];

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
      <Text className="text-sm">{item.date}</Text>
      <Text className="text-sm flex-1 px-2">{item.details}</Text>
      <TouchableOpacity className="bg-pink-500 rounded px-3 py-1">
        <Text className="text-white text-sm">Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-6">
      {/* Profile Section */}
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full border-2 border-gray-400 justify-center items-center">
          {/* Placeholder for Profile Image */}
          <Text className="text-4xl text-gray-400">👤</Text>
        </View>
        <Text className="text-xl font-bold mt-4">LENG Kola</Text>
        <Text className="text-gray-600">088 356 2536</Text>
      </View>

      {/* History Section */}
      <Text className="text-lg font-bold mb-2">History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProfileScreenUpdate;
