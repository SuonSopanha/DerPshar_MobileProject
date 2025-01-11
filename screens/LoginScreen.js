import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/local`, {
        identifier: email,
        password,
      });

      if (response.data && response.data.jwt) {
        // Save JWT token in AsyncStorage
        await AsyncStorage.setItem('jwtToken', response.data.jwt);
        await AsyncStorage.setItem('userName', response.data.user.username);
        await AsyncStorage.setItem('userId', response.data.user.id.toString());

        Alert.alert("Success", "Logged in successfully!", [
          { text: "OK", onPress: () => navigation.replace("Main") },
        ]);

        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword"); // Navigate to Forgot Password screen
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-6`}>
      {/* Logo Section */}
      <View style={tw`flex items-center mb-8 mt-12`}>
        <Image
          source={require("../assets/logo.jpg")} // Placeholder for logo
          style={tw`w-32 h-32 mb-6`}
        />
        <Text style={tw`text-xl font-bold text-pink-500`}>Welcome Back!</Text>
        <Text style={tw`text-sm text-gray-500 mt-2`}>Login to continue</Text>
      </View>

      {/* Email Input */}
      <View style={tw`flex-row items-center mb-4`}>
        <Icon name="mail-outline" size={20} color="#ff1493" style={tw`mr-3`} />
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-sm`}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={tw`flex-row items-center mb-4`}>
        <Icon
          name="lock-closed-outline"
          size={20}
          color="#ff1493"
          style={tw`mr-3`}
        />
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-sm`}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword} style={tw`mb-6`}>
        <Text style={tw`text-sm text-pink-500 text-right`}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 p-4 rounded-lg items-center`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={tw`text-white text-base`}>
          {isLoading ? "Logging In..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Option */}
      <View style={tw`flex-row justify-center mt-8`}>
        <Text style={tw`text-sm text-gray-500`}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={tw`text-sm text-pink-500 ml-2`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
