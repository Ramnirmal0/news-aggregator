
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

## Endpoints



Authorization Bearer Token

#### POST register

[Open request](https://desktop.postman.com/?desktopVersion=11.1.0&userId=34703374&teamId=0&region=us)

http://localhost:3000/users/signup

 

Bodyraw (json)

json

```
{
    "name":"Ebony",
    "email":"username@email.com",
    "password":"-------",
    "preferences":[
        "movies",
        "comics"]
}
```

Example

register

Request

cURL

```
curl --location 'http://localhost:3000/users/signup'\
--data-raw '{
    "name":"Emerson",
    "email":"username@email.com",
    "password":"-------",
    "preferences":[
        "movies",
        "comics"]
}'
```

200 OK

Response

-   Body
-   Headers (7)

json

```
{
    "result": "User registered successfully"
}
```

#### POST login

[Open request](https://desktop.postman.com/?desktopVersion=11.1.0&userId=34703374&teamId=0&region=us)

http://localhost:3000/users/login

 

Bodyraw (json)

json

```
{
    "email": "username@email.com",
    "password": "-------"
}
```

Example

login

Request

cURL

```
curl --location 'http://localhost:3000/users/login'\
--data-raw '{
    "email": "username@email.com",
    "password": "-------"
}'
```

200 OK

Response

-   Body
-   Headers (7)

View More

json

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVzbW9uZCIsImVtYWlsIjoidXNlcm5hbWVAZW1haWwuY29tIiwicHJlZmVyZW5jZXMiOlsibW92aWVzIiwiY29taWNzIl0sImlhdCI6MTcxNTc4OTg0MSwiZXhwIjoxNzE1NzkzNDQxfQ.mdITgZx4IKH080xwzOFqQS28_G4TiKicUhsp9MxmRiE"
}
```

#### GET preferences

[Open request](https://desktop.postman.com/?desktopVersion=11.1.0&userId=34703374&teamId=0&region=us)

http://localhost:3000/users/preferences

 

AuthorizationBearer Token

This request is using an authorization helper from collection Project-2 New Aggregator API

Example

preferences

Request

cURL

```
curl --location 'http://localhost:3000/users/preferences'
```

200 OK

Response

-   Body
-   Headers (7)

json

```
{
    "preferences": [
        "movies",
        "comics"
    ]
}
```

#### PUT preferences

[Open request](https://desktop.postman.com/?desktopVersion=11.1.0&userId=34703374&teamId=0&region=us)

http://localhost:3000/users/preferences

 

AuthorizationBearer Token

This request is using an authorization helper from collection Project-2 New Aggregator API

Bodyraw (json)

json

```
{
    "preferences": ["music", "business", "games"]
}
```

Example

preferences

Request

cURL

```
curl --location --request PUT 'http://localhost:3000/users/preferences'\
--data '{
    "preferences": ["music", "business", "games"]
}'
```

200 OK

Response

-   Body
-   Headers (7)

json

```
{
    "result": "Preference updated for the user"
}
```

#### GET news

[Open request](https://desktop.postman.com/?desktopVersion=11.1.0&userId=34703374&teamId=0&region=us)

http://localhost:3000/news

 

AuthorizationBearer Token

This request is using an authorization helper from collection Project-2 New Aggregator API

Example

news

Request

cURL

```
curl --location 'http://localhost:3000/news'
```

200 OK

Response

-   Body
-   Headers (7)

View More

json

```
{
    "news": [
        {
            "source": {
                "id": null,
                "name": "Eonline.com"
            },
            "author": "Olivia Evans",
            "title": "Zayn Malik Reveals His Relationship Status After Gigi Hadid Breakup---And Getting Kicked Off Tinder - E! NEWS",
            "description": "Zayn Malik detailed his breakups with Gigi Hadid---with whom he shares 3-year-old daughter Khai---and Little Mix's Perrie Edwards, as well as his current relationship status.",
            "url": "https://www.eonline.com/news/1401554/zayn-malik-reveals-his-relationship-status-after-gigi-hadid-breakup-and-getting-kicked-off-tinder",
            "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/2024414/rs_1200x1200-240514071413-zayn.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",

```
