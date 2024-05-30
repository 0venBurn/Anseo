from flask import Flask

def create_app():
    app = Flask(__name__)
    
    with app.app_context():
        from .routes.hello import hello_blueprint
        app.register_blueprint(hello_blueprint)

    return app