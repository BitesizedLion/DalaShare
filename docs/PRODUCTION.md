# Installing and Configuring DalaShare for Production
This guide covers the steps to install and configure DalaShare in a production environment.

## Prerequisites
Before you begin, you will need the following:

* Node.js v12 or later
* NPM
* A MongoDB database (optional)

## Installing

To install DalaShare, follow these steps:

1. Clone the DalaShare repository:
`git clone https://github.com/BitesizedLion/DalaShare.git`

2. Change into the DalaShare directory:
`cd dalashare`

3. Install the project dependencies:
`npm install`

## Configuring
To configure DalaShare, you will need to edit the .env file and set the appropriate values for the following variables:

- `PORT`: The port where the server will listen for incoming connections.

- `RATELIMIT_TYPE`: The type of rate limiter to use. Possible values are `MEM_RATELIMIT` (in-memory rate limiter) or `MONGO_RATELIMIT` 
(MongoDB-backed rate limiter).

- `MONGO_URI`: The URI of the MongoDB database. Only needed if `RATELIMIT_TYPE` is set to `MONGO_RATELIMIT`.

- `MONGO_USER`: The username to use to connect to the MongoDB database. Only needed if `RATELIMIT_TYPE` is set to `MONGO_RATELIMIT`.

- `MONGO_PASSWORD`: The password to use to connect to the MongoDB database. Only needed if `RATELIMIT_TYPE` is set to `MONGO_RATELIMIT`.

- `MONGO_AUTH_SOURCE`: The authentication database to use. Only needed if `RATELIMIT_TYPE` is set to `MONGO_RATELIMIT`.

- `RATELIMIT_WINDOW_MS`: The time window (in milliseconds) to use for the rate limiter.

- `RATELIMIT_MAX`: The maximum number of requests allowed in the time window.

- `TOKEN`: The token that must be provided in the Authorization header to access the API.

## Starting the Server
To start the DalaShare server, run the following command:

`node .`

The server will start listening for incoming connections on the port specified in the .env file.