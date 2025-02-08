import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  // Fetch contacts from the server
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      if (!response.ok) {
        throw new Error(`Failed to fetch contacts. Server returned status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Failed to fetch contacts. Please check your internet connection and try again.");
    }
  };

  // Open modal for creating or editing a contact
  const openModal = (contact = {}) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  // Close modal and reset current contact
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  // Handle modal background click
  const closeModalOnBackgroundClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  // Refresh the contact list after an update
  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <ContactList contacts={contacts} updateContact={openModal} updateCallback={onUpdate} />
      <button onClick={() => openModal()}>Create New Contact🤗</button>
      {isModalOpen && (
        <div className="modal" onClick={closeModalOnBackgroundClick}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;