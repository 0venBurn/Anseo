# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/summer-0.0.1-SNAPSHOT.jar /app/myapp.jar

# Expose the port that the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "myapp.jar"]

