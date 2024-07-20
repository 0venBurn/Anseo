# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Create a .config directory
RUN mkdir .config

# Copy the packaged jar file into the container
COPY target/summer-0.0.1-SNAPSHOT.jar /app/myapp.jar

# Copy the application.properties file into the .config directory
COPY src/main/resources/application.properties /app/.config/application.properties

# Expose the port that the application runs on
EXPOSE 8080

# Run the application with the config file in the .config directory
ENTRYPOINT ["java", "-jar", "myapp.jar", "--spring.config.location=file:/app/.config/application.properties"]
