from flask import jsonify, request
from config import app, db
from models import Contact

@app.route("/contacts", methods= ["GET"])

def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.toJson(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("get_contacts", methods= ["POST"])

def create_contacts():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (jsonify({"message": "You must have name lastname and email😚"}), 400)
    
    new_contact = Contact(first_name=firstName, last_name=lastName, email=email)

    try:
        db.session.add(new_contact)
        db.session.commit()

    except Exception as e:
        return jsonify ({"message": str(e)}), 400
    
    return jsonify({"message": "heyy User Created 🥳"}), 201

@app.route("/update_contact/<int:user_id>" methods=[PATCH])
def update_contact(user_id):
    contact= Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "Oops User not found!"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify ({"message": "Heyy User Updated 🥳"}), 200

@app.route("/delete_contact/<int:<user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact= Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "Oops User not found!"}), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify ({"message": "User Deleted 😣"})




if __name__=="__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
