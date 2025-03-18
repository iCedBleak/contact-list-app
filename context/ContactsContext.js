import React, { createContext, useState } from "react";

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

const addContact = (name, phone) => {
  setContacts((prevContacts) => [
	...prevContacts,
	{ id: Math.random().toString(), name, phone },
  ]);
};

const updateContact = (id, name, phone) => {
  setContacts((prevContacts) =>
	prevContacts.map((contact) =>
	  contact.id === id ? { ...contact, name, phone } : contact
	)
  );
};

const deleteContact = (id) => {
  setContacts((prevContacts) =>
	prevContacts.filter((contact) => contact.id !== id)
  );
};

  return (
	<ContactsContext.Provider
	  value={{ contacts, addContact, updateContact, deleteContact }}
	>
	  {children}
	</ContactsContext.Provider>
  );
};