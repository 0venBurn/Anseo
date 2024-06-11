"""
Run.py

This module serves as an entry point for the application.
It initializes and configures CORS(cross-origin resource sharing) based on environment variables.
The application is set to run on host 0.0.0.0 and port 8000

Modules:
    app (Flask): The Flask application instance created by the create_app function from the app module.
    flask_cors.CORS: Flask extension for handling Cross-Origin Resource Sharing (CORS).
    os: Standard Python library for interacting with the operating system.

Environment Variables:
    CORS_ALLOWED_ORIGINS (str): A comma-separated list of allowed origins for CORS. If set to "*",
                                allows all origins.

Usage:
    This script can be executed directly to start the Flask application.
"""

# Import necessary modules
import os

from app import create_app
from flask_cors import CORS

# Initialise the flask application
app = create_app()

# Retrieve allowed origins for CORS from environment variables
allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")

# Configure CORS settings
if "*" in allowed_origins:
    # Allow allow origins if "*" is specified
    CORS(app)
else:
    # Allow specific origins with defined methods and headers
    CORS(
        app,
        resources={
            r"/*": {
                "origins": allowed_origins,
                "methods": ["GET", "POST", "PUT", "DELETE"],
                "allow_headers": ["Content-Type", "Authorization"],
            }
        },
    )

# Run the app if this script is executed directly
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
