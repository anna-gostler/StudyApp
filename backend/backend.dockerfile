# We don't want to start from scratch.
# That is why we tell node here to use the openjdk image with java 12 as base.
FROM openjdk:13

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy or project directory (locally) in the current directory of our docker image (/app)
#COPY backend/build/libs/*.jar ./app.jar
COPY backend/build/libs/backend-0.0.1-SNAPSHOT.jar ./app.jar

# Expose $PORT on container.
# We use a variable here as the port is something that can differ on the environment.
EXPOSE $PORT

# Start the app
CMD [ "java", "-jar", "./app.jar" ]
