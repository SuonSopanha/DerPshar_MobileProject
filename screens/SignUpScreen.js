import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL } from '@env';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/local/register`, {
        username: name,
        email,
        password,
      });

      if (response.data) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'Unable to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-6`}>
      {/* Logo Section */}
      <View style={tw`flex items-center mb-8 mt-12`}>
        <Image
          source={require('../assets/logo.jpg')} // Placeholder for logo
          style={tw`w-32 h-32 mb-6`}
        />
        <Text style={tw`text-xl font-bold text-pink-500`}>Create Your Account</Text>
        <Text style={tw`text-sm text-gray-500 mt-2`}>Join us and explore endless possibilities</Text>
      </View>

      {/* Name Input */}
      <View style={tw`flex-row items-center mb-4`}>
        <Icon name="person-outline" size={20} color="#ff1493" style={tw`mr-3`} />
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-sm`}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
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
        <Icon name="lock-closed-outline" size={20} color="#ff1493" style={tw`mr-3`} />
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-sm`}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input */}
      <View style={tw`flex-row items-center mb-4`}>
        <Icon name="lock-closed-outline" size={20} color="#ff1493" style={tw`mr-3`} />
        <TextInput
          style={tw`flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-sm`}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Sign-Up Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 p-4 rounded-lg items-center`}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text style={tw`text-white text-base`}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <View style={tw`flex-row justify-center mt-8`}>
        <Text style={tw`text-sm text-gray-500`}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={tw`text-sm text-pink-500 ml-2`}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
