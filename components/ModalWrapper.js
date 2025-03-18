import React from "react";
import { Modal, View, StyleSheet } from "react-native";

const ModalWrapper = ({ visible, onClose, children }) => {
  return (
	<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
	  <View style={styles.modalContainer}>{children}</View>
	</Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	padding: 20,
	backgroundColor: "#555a54",
  },
});

export default ModalWrapper;