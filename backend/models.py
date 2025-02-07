from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(80), unique=False, nullable=False)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


    def toJson(self):
        return{
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email

        }


