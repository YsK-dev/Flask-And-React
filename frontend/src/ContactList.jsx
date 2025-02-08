import React from 'react';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, updateContact, updateCallback }) => {

    const onDelete = async (id) =>{
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete 😵")
            }
        } catch (error){
            alert(error)

        }

    }


    return (
        <div>
            <h2>Contacts👥</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick= {() => updateCallback(contact)}>Update</button>
                                <button onClick= {() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ContactList;