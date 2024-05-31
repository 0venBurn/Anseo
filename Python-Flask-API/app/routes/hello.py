from flask import Blueprint

hello_blueprint = Blueprint("hello", __name__)

@hello_blueprint.route("/hello", methods=["Get"])
def hello():
    return "Hello, from the API!"