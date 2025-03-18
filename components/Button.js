import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress, style }) => {
  return (
	<TouchableOpacity style={[styles.button, style]} onPress={onPress}>
	  <Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
	backgroundColor: "#E1DDD2",
	padding: 10,
	borderRadius: 5,
	alignItems: "center",
  },
  text: {
	color: "#555A54",
	fontSize: 16,
	fontWeight: "bold",
  },
});

export default Button;