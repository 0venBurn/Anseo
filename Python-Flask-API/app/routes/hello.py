from flask import Blueprint
import os 
hello_blueprint = Blueprint("hello", __name__)

@hello_blueprint.route("/hello", methods=["Get"])
def hello():
    db_host = os.getenv('DB_HOST')
    return f"Hello, from the API!, Here is a {db_host}"