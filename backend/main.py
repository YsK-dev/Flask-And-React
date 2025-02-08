from flask import jsonify, request
from config import app, db
from models import Contact
from flask_cors import CORS  # Import CORS

# Enable CORS for all routes
CORS(app)

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.toJson(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/create_contact", methods=["POST"])
def create_contacts():
    print("Request JSON:", request.json)  # Log the request payload
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return jsonify({"message": "You must provide first name, last name, and email😚"}), 400

    existing_contact = Contact.query.filter_by(email=email).first()
    if existing_contact:
        return jsonify({"message": "Email already exists!"}), 400

    new_contact = Contact(firstName=first_name, lastName=last_name, email=email)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        print("Error:", str(e))  # Log the exception
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

    return jsonify({"message": "User Created 🥳"}), 201

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found!"}), 404

    data = request.json
    new_email = data.get("email")

    if new_email and new_email != contact.email:
        existing_contact = Contact.query.filter_by(email=new_email).first()
        if existing_contact:
            return jsonify({"message": "Email already exists!"}), 400

    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User Updated 🥳"}), 200

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found!"}), 404

    try:
        db.session.delete(contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User Deleted 😣"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)