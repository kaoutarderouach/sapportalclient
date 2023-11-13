# Base image
FROM node

# Set the working directory
WORKDIR /app

# Copy the app files to the image
COPY . .
# Install the app dependencies
RUN npm install
RUN npm install -g @angular/cli
# Expose the port used by the app
EXPOSE 4200

# Run the app using the ng serve command
CMD ["ng", "serve", "--host", "0.0.0.0"]
