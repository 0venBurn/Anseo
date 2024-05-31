from flask import Flask
from dotenv import load_dotenv
import os


def create_app():
    app = Flask(__name__)

    # Load the .env file
    load_dotenv()

    # Determine the environment
    env = os.getenv("ENV", "local")

    if env == "local":
        load_dotenv(".env.local")
    elif env == "dev":
        load_dotenv(".env.dev")
    elif env == "prod":
        load_dotenv(".env.prod")

    with app.app_context():
        from .routes.hello import hello_blueprint

        app.register_blueprint(hello_blueprint)

    return app
