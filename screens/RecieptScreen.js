import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const RecieptScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Reciept Screen</Text>
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

export default RecieptScreen;
