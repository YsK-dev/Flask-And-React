import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data.contacts);
      console.log(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Failed to fetch contacts. Please check the server and try again.");
    }
  };

  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm onContactCreated={fetchContacts} />
    </>
  );
}

export default App;