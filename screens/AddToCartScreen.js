import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const AddToCardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add To Cart</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddToCardScreen;
