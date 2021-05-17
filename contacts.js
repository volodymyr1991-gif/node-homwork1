const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, "/db/contacts.json");


function listContacts() {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      const contacts = JSON.parse(data);
      console.log("Contacts: ");
      console.table(contacts);
    });
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      const contacts = JSON.parse(data);
      const contactById = contacts.find((contact) => contact.id === contactId);
      console.table(contactById);
    });
  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      const contacts = JSON.parse(data);
      const newList = contacts.filter((contact) => contact.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newList), "utf8", (err) => {
        if (err) {
          return console.log(err);
        }
        console.table(newList);
      });
    });
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath, "utf-8", (err, data) => {
      if (err) {
        return console.log(err);
      }
      const contacts = JSON.parse(data);
      const maxId = Math.max(...contacts.map((contact) => contact.id));
      const newContact = {
        id: maxId + 1,
        name: String(name),
        email: String(email),
        phone: String(phone),
      };
      const newContactsList = [...contacts, newContact];
      fs.writeFile(
        contactsPath,
        JSON.stringify(newContactsList),
        "utf8",
        (err) => {
          if (err) {
            return console.log(err);
          }
          console.table(newContactsList);
        }
      );
    });
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
  
  