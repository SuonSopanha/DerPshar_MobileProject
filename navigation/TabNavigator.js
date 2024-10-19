import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import CartScreen from '../screens/CartScreen';
import DetailScreen from '../screens/DetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import RecieptScreen from '../screens/RecieptScreen';
import StartScreen from '../screens/StartSrceen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'AddToCart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'basket' : 'basket-outline';
          } else if (route.name === 'Detail') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Payment') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Reciept') {
            iconName = focused ? 'document-text' : 'receipt-outline';
          } else if (route.name === 'Start') {
            iconName = focused ? 'play' : 'play-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="AddToCart" component={AddToCartScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Detail" component={DetailScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
      <Tab.Screen name="Reciept" component={RecieptScreen} />
      <Tab.Screen name="Start" component={StartScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
