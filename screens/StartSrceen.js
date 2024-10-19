import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Start</Text>
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

export default StartScreen;
