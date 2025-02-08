import { useState } from 'react';

const ContactForm = ({ onContactCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url = 'http://127.0.0.1:5000/create_contact';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = await response.json();
        alert(message.message);
      } else {
        alert('Contact created successfully! 🥳');
        // Clear the form
        setFirstName('');
        setLastName('');
        setEmail('');
        // Refresh the contact list
        if (onContactCreated) {
          onContactCreated();
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Failed to connect to the server. Please check the server and try again.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Create Contact</button>
    </form>
  );
};

export default ContactForm;