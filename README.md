
# News Aggregator API

The News Portal API provides endpoints for user authentication, managing user preferences, and fetching news articles based on user preferences. It is built with Node.js, Express.js, and integrates with a MongoDB database.

### Requirements

Set up a basic Node.js project with Express.js and other necessary NPM packages.

Implement user registration and login using bcrypt and JWT for password hashing and token-based authentication.

Create an in-memory data store (e.g., an array) to store user information and their news preferences.

Implement a RESTful API with the following endpoints:

POST /register: Register a new user.

POST /login: Log in a user.

GET /preferences: Retrieve the news preferences for the logged-in user.

PUT /preferences: Update the news preferences for the logged-in user.

GET /news: Fetch news articles based on the logged-in user's preferences.

Use external news APIs to fetch news articles from multiple sources. Incorporate async/await and Promises in the process of fetching news data and filtering it based on user preferences.

Implement proper error handling for invalid requests, authentication errors, and authorization errors.

Add input validation for user registration and news preference updates.

Test the API using Postman or Curl to ensure it works as expected.

## Installation


1\. Install dependencies:

```bash
npm install
```

2\. Set up environment variables (see [Environment Variables](#environment-variables)).

3\. Start the server:

```bash
npm start
```

4\. test the code:

```bash
npm run test
```

## Usage

Once the server is running, you can make requests to the provided endpoints using tools like Postman or cURL. Make sure to include the required headers and request payloads as specified in the documentation.

## Endpoints

### User Authentication

- `POST /users/signup`: Register a new user.

- `POST /users/login`: Authenticate user and generate JWT token.

### User Preferences

- `GET /users/preferences`: Retrieve user preferences.

- `PUT /users/preferences`: Update user preferences.

### News

- `GET /news`: Fetch news articles based on user preferences.

For detailed information on request payloads and responses, refer to the API documentation or inspect the codebase.

## Environment Variables

The following environment variables need to be set:

- `SECRETkEY`: Secret key used for JWT token generation.

- `newsEndpoint`: URL for the news API endpoint.

