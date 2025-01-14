import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons"; // Using Ionicons for icons
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";

const ProfilePage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState(
    "A software developer passionate about technology."
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleSaveProfile = () => {
    console.log({
      name,
      email,
      bio,
      password,
      confirmPassword,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Replace with your API endpoint
        setName(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Profile Header */}
      <View style={tw`flex items-center mb-8`}>
        <View
          style={tw`w-24 h-24 rounded-full border-2 border-gray-400 justify-center items-center`}
        >
          {/* Placeholder for Profile Image */}
          <Text style={tw`text-4xl text-gray-400`}>👤</Text>
        </View>
        <Text style={tw`text-xl font-bold mb-1`}>{name}</Text>
        <Text style={tw`text-sm text-gray-500`}>{email}</Text>
      </View>

      {/* Personal Information */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-lg font-bold mb-4`}>Personal Information</Text>

        {/* Name Input */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon
            name="person-outline"
            size={20}
            color="#ff1493"
            style={tw`mr-3`}
          />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Email Input */}
        <View style={tw`flex-row items-center mb-4`}>
          <Icon
            name="mail-outline"
            size={20}
            color="#ff1493"
            style={tw`mr-3`}
          />
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-lg p-2 bg-gray-200 text-sm`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Change Password Section */}

      {/* Save Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 p-3 rounded-lg items-center`}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={tw`text-white text-base`}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfilePage;
