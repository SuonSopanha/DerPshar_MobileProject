import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for icons

const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('A software developer passionate about technology.');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    console.log({
      name,
      email,
      bio,
      password,
      confirmPassword
    });
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Profile Header */}
      <View style={tw`flex items-center mb-8`}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for profile image
          style={tw`w-24 h-24 rounded-full mb-4`}
        />
        <Text style={tw`text-xl font-bold mb-1`}>{name}</Text>
        <Text style={tw`text-sm text-gray-500`}>{email}</Text>
      </View>

      {/* Personal Information */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-bold mb-4`}>Personal Information</Text>

        {/* Name Input */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="person-outline" size={20} color="#ff1493" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="mail-outline" size={20} color="#ff1493" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Bio Input */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="text-outline" size={20} color="#ff1493" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Write a short bio"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>
      </View>

      {/* Change Password Section */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-bold mb-4`}>Change Password</Text>

        {/* New Password */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="lock-closed-outline" size={20} color="#ff1493" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="New password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon name="lock-closed-outline" size={20} color="#ff1493" style={tw`mr-3`} />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 p-3 rounded-lg items-center`}
        onPress={handleSaveProfile}
      >
        <Text style={tw`text-white text-base`}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;
