from flask import Flask
from flask_cors import CORS
from events import events_bp

app = Flask(__name__)
CORS(app, resources={
     r"*": {"origins": ["http://localhost:5173", "http://localhost:8000"]}})
app.register_blueprint(events_bp)


if __name__ == '__main__':
    app.run(port=8000, debug=True)
