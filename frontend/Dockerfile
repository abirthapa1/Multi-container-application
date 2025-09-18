FROM node:18.20.8-alpine3.21

# Creating a group called app and adding the user app
# with sudo privileges
RUN addgroup app && adduser -S -G app app

# Switiching to the user app
USER app

# Creating a working directory
WORKDIR /app

#Copying the JSON files
COPY package*.json ./

#Installing the dependencies
RUN npm ci

#Copying the other files
COPY . .

#EXposing the port
EXPOSE 3000

#Starting up the server
CMD ["npm", "start"]