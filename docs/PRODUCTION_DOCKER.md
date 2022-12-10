# DalaShare Production Guide for Docker

## Prerequisites

Before you begin, you need to have the following prerequisites installed on your system:

- Docker
- Docker Compose

## Installation

To run DalaShare using Docker, follow these steps:

1. Clone the DalaShare repository to your local system:

`git clone https://github.com/BitesizedLion/DalaShare.git`


2. Navigate to the project directory:

`cd dalashare`


3. Edit the `docker-compose.yml` file to specify the values of the environment variables:

`nano docker-compose.yml`


4. Build the Docker image:

`docker-compose build`


5. Start the Docker container:

`docker-compose up`

## Configuration

To configure DalaShare, you need to edit the `docker-compose.yml` file in the project directory. This file contains the environment variables that are used by Docker Compose to configure the Docker container.

Here is a description of the different environment variables:

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