from flask import Flask
from dotenv import load_dotenv


def create_app():
    app = Flask(__name__)

    # Load the .env file
    load_dotenv(".env")

    with app.app_context():
        from .routes.hello import hello_blueprint
        from .routes.test_model import test_model_blueprint

        app.register_blueprint(hello_blueprint)
        app.register_blueprint(test_model_blueprint)

    return app
