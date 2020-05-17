FROM node:alpine3.11

# Create application directory
RUN mkdir -p /app

# The /app directory acts as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY frontend/package.json ./
COPY frontend/package-lock.json ./

# Install node packages
RUN npm install

# Copy or project directory (locally) in the current directory of docker image (/app)
COPY frontend/ .

# Build the app
RUN npm run build

# Expose $PORT on container.
# PORT is set in heroku config variables
EXPOSE $PORT

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0

# Set app port
ENV NUXT_PORT=$PORT

# Set the base url
# PROXY_API is set in heroku config variables
ENV PROXY_API=$PROXY_API

# Set the browser base url
ENV PROXY_LOGIN=$PROXY_LOGIN

# Start the app
CMD [ "npm", "start" ]

# import data
# RUN node node-js-mongodb-connection.js 