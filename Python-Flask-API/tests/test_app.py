"""
test_app.py

This module contains unit tests for the Flask application created by create_app() function.
The tests ensure that the application is correctly instantiated and configured, particularly 
with regard to CORS settings and environment variables.

Fixtures:
    app: A fixture to create a Flask app instance for testing.
    client: A fixture to create a test client for the Flask app.

Test Cases:
    test_app_creation: Test to ensure the Flask app is created and running.
    test_cors_configuration: Test to ensure CORS is configured correctly.
"""

# Import necessary modules
import os
import pytest
from app import create_app
from flask import Flask


@pytest.fixture
def app() -> Flask:  # type: ignore
    """
    Fixture to create a Flask app instance for testing.
    """
    # Backup the current environment variables
    original_cors_allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS")
    original_db_host = os.getenv("DB_HOST")

    # Set the environment variables for testing
    os.environ["CORS_ALLOWED_ORIGINS"] = "http://localhost,http://example.com"
    os.environ["DB_HOST"] = "localhost"

    app = create_app()

    yield app  # type: ignore

    # Restore the original environment variables after test
    if original_cors_allowed_origins is not None:
        os.environ["CORS_ALLOWED_ORIGINS"] = original_cors_allowed_origins
    else:
        del os.environ["CORS_ALLOWED_ORIGINS"]

    if original_db_host is not None:
        os.environ["DB_HOST"] = original_db_host
    else:
        del os.environ["DB_HOST"]


@pytest.fixture
def client(app: Flask):
    """
    Fixture to create a test client for the Flask app.
    """
    return app.test_client()


def test_app_creation(client):
    """
    Test to ensure the Flask app is created and running.
    """
    response = client.get("/hello")
    assert response.status_code == 200
    assert (
        b"Hello, from the API!, Here is a localhost" in response.data
    )  # Assuming the /hello endpoint returns "Hello, from the API!, Here is a localhost"


def test_cors_configuration(app: Flask):
    """
    Test to ensure CORS is configured correctly.
    """
    allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
    assert "http://localhost" in allowed_origins
    assert "http://example.com" in allowed_origins
