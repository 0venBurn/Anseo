from flask import Flask
from dotenv import load_dotenv
import os


def create_app():
    app = Flask(__name__)

    # Load the .env file
    load_dotenv(".env")

    with app.app_context():
        from .routes.hello import hello_blueprint

        app.register_blueprint(hello_blueprint)

    return app
