import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { View, Text } from 'react-native';
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51Qg93YRwSiMvAGOLSezdz6X9KhfIkZR1pxU1czygdP9eZWeaHBbkDCKiTUiWpqFXIZg775vtJcsQgEUZ9FDSn5U700DBhJ5xfc">
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </StripeProvider>
  );
}
