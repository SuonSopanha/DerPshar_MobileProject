import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "react-native-paper"; // Import RadioButton

const AddToCartScreen = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [deliverBy, setDeliverBy] = useState("Pickup");
  const [payBy, setPayBy] = useState("Credit Card");

  const handleAddToCart = () => {
    console.log({
      name,
      location,
      phoneNumber,
      totalAmount,
      deliverBy,
      payBy,
    });
  };

  return (
    <View style={styles.container}>
      {/* Product Image */}
      <Image
        source={require("../assets/watch.jpg")} // Local image path
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* Name Input */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Location Input */}
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Phone Number Input */}
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Total Amount Input */}
      <Text style={styles.label}>Total Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter total amount"
        keyboardType="numeric"
        value={totalAmount}
        onChangeText={setTotalAmount}
      />

      {/* Deliver By - Radio Buttons */}
      <Text style={styles.label}>Deliver By:</Text>
      <RadioButton.Group
        onValueChange={(value) => setDeliverBy(value)}
        value={deliverBy}
      >
        <View style={styles.radioRow}>
          <RadioButton value="Pickup" color="#ff1493" />
          <Text style={styles.radioText}>Pickup</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="Home Delivery" color="#ff1493" />
          <Text style={styles.radioText}>Home Delivery</Text>
        </View>
      </RadioButton.Group>

      {/* Pay By - Radio Buttons */}
      <Text style={styles.label}>Pay By:</Text>
      <RadioButton.Group onValueChange={(value) => setPayBy(value)} value={payBy}>
        <View style={styles.radioRow}>
          <RadioButton value="Credit Card" color="#ff1493" />
          <Text style={styles.radioText}>Credit Card</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="Cash on Delivery" color="#ff1493" />
          <Text style={styles.radioText}>Cash on Delivery</Text>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="Bank Transfer" color="#ff1493" />
          <Text style={styles.radioText}>Bank Transfer</Text>
        </View>
      </RadioButton.Group>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 6,
    marginBottom: 10,
    fontSize: 12,
    backgroundColor: "lightgrey",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  radioText: {
    marginLeft: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#ff1493",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddToCartScreen;
