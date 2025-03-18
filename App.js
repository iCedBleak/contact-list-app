import React, { useState, useContext } from "react";
import { Image, View, FlatList, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ContactsProvider, ContactsContext } from "./context/ContactsContext";
import ModalWrapper from "./components/ModalWrapper";
import Button from "./components/Button";

const App = () => {
  const { contacts, addContact, updateContact, deleteContact } =
    useContext(ContactsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = (contact = null) => {
    setEditingContact(contact);
    setName(contact?.name || "");
    setPhone(contact?.phone || "");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setName("");
    setPhone("");
  };

  const handleSave = () => {
    if (editingContact) {
      updateContact(editingContact.id, name, phone);
    } else {
      addContact(name, phone);
    }
    closeModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require('./assets/images/contacts.png')}
          style={styles.imageIcon}
        />
        <Text style={styles.title}>Contact List</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => openModal(item)} >
                <Image
                  source={require('./assets/images/edit-icon.png')}
                  style={styles.imageIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteContact(item.id)} >
                <Image
                  source={require('./assets/images/delete-icon.png')}
                  style={styles.imageIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => openModal()} style={styles.addIcon}>
        <Image
          source={require('./assets/images/add-icon.png')}
          style={styles.imageIcon}
        />
      </TouchableOpacity>
      <ModalWrapper visible={modalVisible} onClose={closeModal}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
          style={styles.input}
          keyboardType="numeric"
          maxLength={11}
        />
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={closeModal} style={styles.cancelButton} />
          <Button title={editingContact ? "Update" : "Add"} onPress={handleSave} style={styles.addButton} />
        </View>
      </ModalWrapper>
    </View>
  );
};

export default () => (
  <ContactsProvider>
    <App />
  </ContactsProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#555A54",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  addIcon: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: "#F7F2EF",
    borderRadius: 100,
    paddingLeft: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F7F2EF",
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#4C514B",
    borderRadius: 5,
  },
  contactName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F7F2EF",
  },
  contactPhone: {
    fontSize: 16,
    color: "#F7F2EF",
    opacity: 0.7,
  },
  actions: {
    flexDirection: "row",
  },
  input: {
    color: "#F7F2EF",
    borderBottomWidth: 2,
    borderBottomColor: "#F7F2EF",
    marginBottom: 15,
    width: "75%",
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#F7F2EF",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    opacity: 0.7,
  },
  addButton: {
    flex: 1,
  },
});