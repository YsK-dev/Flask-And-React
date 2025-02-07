from flask import Flask

app = Flask(__name__)

@app.route("/")
def helloWorld():
    return "helloWorldof my mysterious"

if __name__ =="__main__":
    app.run()

