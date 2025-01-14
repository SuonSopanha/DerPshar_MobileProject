import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Import your screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddToCartScreen from "../screens/AddToCartScreen";
import CartScreen from "../screens/CartScreen";
import DetailScreen from "../screens/DetailScreen";
import PaymentScreen from "../screens/PaymentScreen";
import RecieptScreen from "../screens/RecieptScreen";
import TestScreen from "../screens/TestScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ProfileScreenUpdate from "../screens/ProfileScreenUpdate";
import RecieptScreenUpdate from "../screens/RecieptScreenUpdate";
import CustomHeader from "../components/CustomHeader";
import CategoryDetails from "../screens/CategoryDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator with only the required tabs visible
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "basket" : "basket-outline";
          } else if (route.name === "Reciept") {
            iconName = focused ? "document-text" : "receipt-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Disable default header for TabNavigator
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Reciept" component={ProfileScreenUpdate} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator to handle all screens, including hidden ones
const StackNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <CustomHeader />, // Custom header for all screens
      }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false, title: "Sign Up" }}
          />
        </>
      ) : (
        <>
          {/* Main Tab Navigator */}
          <Stack.Screen name="Main" component={TabNavigator} />
          
          {/* Hidden routes */}
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Order" component={AddToCartScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="OrderList" component={ProfileScreenUpdate} />
          <Stack.Screen name="OrderDetail" component={RecieptScreenUpdate} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
