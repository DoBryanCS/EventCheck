from flask import Flask
from routes import create_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CORS(app, origins=["http://localhost:3000"])
create_routes(app)

if __name__ == '__main__':
    app.run(debug=True)