import { useState } from 'react';
import PropTypes from 'prop-types';

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || '');
  const [lastName, setLastName] = useState(existingContact.lastName || '');
  const [email, setEmail] = useState(existingContact.email || '');

  const isUpdating = Object.keys(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url = `http://127.0.0.1:5000/${isUpdating ? `update_contact/${existingContact.id}` : "create_contact"}`;
    const method = isUpdating ? "PATCH" : "POST";

    try {
      console.log("Sending request to:", url);
      console.log("Request payload:", data);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      updateCallback();
      alert(isUpdating ? 'Contact updated successfully! 🥳' : 'Contact created successfully! 🥳');

      if (!isUpdating) {
        setFirstName('');
        setLastName('');
        setEmail('');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Failed to submit the form. Please try again.');
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
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isUpdating ? "Update" : "Create"}</button>
    </form>
  );
};

ContactForm.propTypes = {
  existingContact: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
  updateCallback: PropTypes.func.isRequired,
};

ContactForm.defaultProps = {
  existingContact: {},
};

export default ContactForm;