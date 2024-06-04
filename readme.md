# Anseo

## Overview
Anseo is an innovative application designed to help business owners, entrepreneurs, and projected business owners scout potential locations for setting up their businesses. The app provides crucial insights into various factors affecting business success, such as footfall, earnings per person, crime statistics, and access to public transport.

## Team
Evan Byrne
Zikang Wang
Niall Mckay
Eamonn Walsh
Sadhbh Redmond 

## Core Features
- **Business Activity Monitoring:** Analyze the busyness of an area at specific times and dates using taxi data.
- **Footfall Analysis:** Assess the amount of footfall in different areas based on taxi drop-off times.
- **Earnings Insights:** Determine the earnings per person in each neighborhood using census data to evaluate the suitability of different business types.
- **Crime Statistics:** Evaluate crime statistics (TBC) to ensure the safety and suitability of locations.
- **Demographics:** Use census data to understand the demographics of each area.
- **Public Transport Access:** Visualize access to public transport links, including subway stations.
- **Location Visualization:** Use maps to visualize potential business locations.
- **Operating Hours Suggestions:** Get suggestions for optimal opening and closing hours for your business.
- **Neighborhood Selection:** Choose the most suitable borough or neighborhood for setting up your business.

## Additional Features
- **Property Listings:** Display specific buildings available on the market in each area.
- **3D Maps:** Provide 3D map views of potential locations.

## Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **Vite**
- **TypeScript**

### Backend
- **Java Spring Boot**
  - REST APIs for database interaction
  - JPA / Hibernate for CRUD operations
  - SQL scripts for database setup

### Data
- **Python**
- **Sklearn**
- **Tensorflow**

### Developer Tools
- **Docker:** For developing and deploying the application.
- **Linters & Formatters:**
  - **Python:** Black, Flake8, Ruff
  - **Java:** Google Java Format, Checkstyle
  - **TypeScript:** Prettier, ESLint

## Project Management
-**JIRA**
-**Slack**
-**Scrum/Agile**
We will handle sprints with the following approach:
- **Sprint Planning:** Held at the beginning of each sprint to discuss tasks and goals.
- **Daily Scrum Meetings:** Held at 10 am every weekday for quick updates.
- **Sprint Retrospective:** Held at the end of each sprint to review progress and challenges.

## How to install and run

### Requirements

- Conda
- Node
- Docker Desktop
- Maven
- JVM

#### React-Frontend

- Navigate to the frontend directory at React-Frontend
- Run npm install to install all dependencies and packages
- To run local server type: "npm run dev" in your terminal
- To run formatter type: "npm run format" in your terminal
- To run linter type: "npm run lint" in your terminal
- To run linter with fixes type: "npm run lint:fix" in your terminal
- To build docker container config within this directory type: "docker build -t react-frontend ." in your terminal
- -t in the previous code indicates the tag for the docker container 
- To run the docker image just built within this directory type: "docker run -d -p 80:80 --name react-frontend in your terminal
- -d indicates running the docker container in detached mode meaning the terminal will be clear 
- -p indicates what host and container ports will be used. First -> Host, Second -> Container Port 
- To build the docker compose build type "docker-compose build" in your terminal
- To build docker container with type "docker-compose up" in your terminal
- To stop the docker compose build type "docker-compose down" in your terminal
- To restart the docker compose build type "docker-compose restart" in your terminal

#### Python-Flask-API
- Navigate to the Flask API directory at Python-Flask-API 
- Create a conda environment by running the following code in your terminal
- "conda create --name flask-api"
- "conda activate flask-api"
- "pip install -r requirements.txt"
- To run the application on a local host type "python run.py" in your terminal
- To build docker container config within this directory type: "docker build -t flask-api ." in your terminal
- -t in the previous code indicates the tag for the docker container 
- To run the docker image just built within this directory type: "docker run -d -p 8000:8000 --name react-frontend in your terminal
- -d indicates running the docker container in detached mode meaning the terminal will be clear 
- -p indicates what host and container ports will be used. First -> Host, Second -> Container Port 
- To build the docker compose build type "docker-compose build" in your terminal
- To build docker container with type "docker-compose up" in your terminal
- To stop the docker compose build type "docker-compose down" in your terminal
- To restart the docker compose build type "docker-compose restart" in your terminal

#### Java-Spring-Backend
