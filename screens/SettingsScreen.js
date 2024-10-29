import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons"; // Importing Ionicons

const SettingsScreen = () => {
  const [username, setUsername] = useState(""); // Username input
  const [email, setEmail] = useState(""); // Email input
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false); // Toggle for notifications
  const [darkMode, setDarkMode] = useState(false); // Toggle for dark mode
  const [locationEnabled, setLocationEnabled] = useState(false); // Toggle for location access
  const [autoUpdate, setAutoUpdate] = useState(false); // Toggle for auto-update

  const handleSaveSettings = () => {
    console.log({
      username,
      email,
      isNotificationsEnabled,
      darkMode,
      locationEnabled,
      autoUpdate,
    });
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100 p-4`}>
      {/* Profile Settings */}

      {/* App Preferences */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-base font-bold mb-4`}>App Preferences</Text>

        {/* Notifications */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <Icon name="notifications-outline" size={20} color="#ff1493" style={tw`mr-3`} />
            <Text style={tw`text-sm`}>Enable Notifications</Text>
          </View>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            trackColor={{ false: "#ccc", true: "#ff1493" }}
            thumbColor={isNotificationsEnabled ? "#ff1493" : "#f4f3f4"}
          />
        </View>

        {/* Dark Mode */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <Icon name="moon-outline" size={20} color="#ff1493" style={tw`mr-3`} />
            <Text style={tw`text-sm`}>Dark Mode</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#ccc", true: "#ff1493" }}
            thumbColor={darkMode ? "#ff1493" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Security Settings */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-base font-bold mb-4`}>Security Settings</Text>

        {/* Location Access */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <Icon name="location-outline" size={20} color="#ff1493" style={tw`mr-3`} />
            <Text style={tw`text-sm`}>Enable Location Access</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: "#ccc", true: "#ff1493" }}
            thumbColor={locationEnabled ? "#ff1493" : "#f4f3f4"}
          />
        </View>

        {/* Auto-update */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center`}>
            <Icon name="cloud-upload-outline" size={20} color="#ff1493" style={tw`mr-3`} />
            <Text style={tw`text-sm`}>Auto-update Apps</Text>
          </View>
          <Switch
            value={autoUpdate}
            onValueChange={setAutoUpdate}
            trackColor={{ false: "#ccc", true: "#ff1493" }}
            thumbColor={autoUpdate ? "#ff1493" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={tw`bg-pink-500 p-3 rounded-lg items-center mt-6`}
        onPress={handleSaveSettings}
      >
        <Text style={tw`text-white text-base`}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
