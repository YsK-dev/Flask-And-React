import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

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
    } catch (error) {
      console.error("Error fetching contacts:", error);
      alert("Failed to fetch contacts. Please check the server and try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () =>{
    if (!isModalOpen)  setIsModalOpen(true)
  }

  const openEditModal = (contact) =>{
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () =>{
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal}  updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Contact🤗</button>
      { isModalOpen && <div className="modal">
        <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>

      </div>

      }
      
    </>
  );
}

export default App;