
# Contact Management App

A full-stack web application for managing contacts. Built with **React** for the frontend and **Flask** for the backend, this app allows users to create, read, update, and delete (CRUD) contacts.

---

## Features

- **Create Contacts**: Add new contacts with first name, last name, and email.
- **Read Contacts**: View a list of all contacts in a table.
- **Update Contacts**: Edit existing contacts.
- **Delete Contacts**: Remove contacts from the list.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Hooks**: `useState`, `useEffect` for state and lifecycle management.
- **PropTypes**: For type-checking props in React components.
- **CSS**: Basic styling for the app and modal.

### Backend
- **Flask**: A lightweight Python web framework.
- **SQLAlchemy**: An ORM for database management.
- **Flask-CORS**: For enabling Cross-Origin Resource Sharing (CORS).

### Database
- **SQLite**: A lightweight, file-based database (default for development).

---

## Project Structure

```
contact-management-app/
├── backend/
│   ├── main.py               # Flask application
│   ├── models.py            # Database models
│   ├── config.py            # Flask and database configuration
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx          # Main application component
│   │   ├── index.css        # Style
│   │   └── App.css          # Styles for the app
|   |   └── ContactForm.jsx  # Contact form
|   |   └── Contactlist.jsx  # Contact list
│   ├── package.json         # Node.js dependencies
│   └── README.md            # Frontend-specific README
└── README.md                # Main project README
```

---

## Setup Instructions

### Prerequisites

- **Node.js** (for the frontend)
- **Python 3.x** (for the backend)
- **SQLite** (for the database)

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install flask flask-cors
   ```



3. Run the Flask server:
   ```bash
   python main.py
   ```
   The backend will be available at `http://127.0.0.1:5000`.

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`. 

---

## Usage

1. **View Contacts**:
   - Open the app in your browser.
   - The list of contacts will be displayed in a table.

2. **Create a Contact**:
   - Click the **Create New Contact🤗** button.
   - Fill in the form and click **Create**.

3. **Update a Contact**:
   - Click the **Update** button next to the contact you want to edit.
   - Modify the details in the form and click **Update**.

4. **Delete a Contact**:
   - Click the **Delete** button next to the contact you want to remove.
   - Confirm the deletion.

---

## API Endpoints

### Backend API

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/contacts`             | Get all contacts.                    |
| POST   | `/create_contact`       | Create a new contact.                |
| PATCH  | `/update_contact/<id>`  | Update an existing contact by ID.    |
| DELETE | `/delete_contact/<id>`  | Delete a contact by ID.              |

---

## Screenshots

### Contact List
<img width="719" alt="Screenshot 2025-02-09 at 12 26 48" src="https://github.com/user-attachments/assets/456a0fd6-5b08-4ee7-a4c2-11ab299bd0fc" />


### Create/Update Modal
<img width="924" alt="Screenshot 2025-02-09 at 13 01 23" src="https://github.com/user-attachments/assets/2c368c34-cb06-4ae1-a8ff-190754234204" />


---

## Troubleshooting

### Backend Issues
- **Database not updating**:
  - Ensure the database is properly initialized (`db.create_all()`).
  - Check the Flask server logs for errors.

- **CORS errors**:
  - Ensure `Flask-CORS` is installed and configured correctly.

### Frontend Issues
- **Form not submitting**:
  - Check the browser console for errors.
  - Verify the backend API is running and accessible.

- **State not updating**:
  - Ensure `updateCallback` is called after successful API requests.

---

## Contributing

Contributions are welcome! :

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **React**: For building a dynamic frontend.
- **Flask**: For providing a lightweight backend.
- **SQLAlchemy**: For simplifying database interactions.

