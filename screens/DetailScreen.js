import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
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

export default DetailScreen;
