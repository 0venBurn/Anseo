# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mv .env.dev .env

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "run:app"]
