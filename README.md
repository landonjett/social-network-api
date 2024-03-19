# social-network-api
## noSQL Social Network API

A robust RESTful API designed to power a full-featured social network application. This project provides endpoints for essential user and thought interactions.

## Key Features

 User Management

Create new users (POST /api/users)
Read all users or retrieve a single user by ID with populated thoughts and friends data (GET /api/users and GET /api/users/:userId)
Update existing user information (PUT /api/users/:userId)
Delete a user (DELETE /api/users/:userId)
Add and remove friends (POST /api/users/:userId/friends/:friendId and DELETE /api/users/:userId/friends/:friendId)

 Thought Creation and Management

Create a new thought, associating it with a user (POST /api/thoughts)
Read all thoughts or a single thought by ID (GET /api/thoughts and GET /api/thoughts/:thoughtId)
Update an existing thought (PUT /api/thoughts/:thoughtId)
Delete a thought (DELETE /api/thoughts/:thoughtId)
Add and remove reactions (comments) on thoughts (POST /api/thoughts/:thoughtId/reactions and DELETE /api/thoughts/:thoughtId/reactions/:reactionId)

## Installation and Usage 

Prerequisites

Node.js and npm (or yarn)
A MongoDB instance (local or cloud-based)

Setup

1. CLone the Repository:

    git clone https://github.com/landonjett/social-network-api

2. Install Dependencies: 

    cd social-network-api
    npm install

3. Environmetnal Variables 

 - Create a .env file in the root of the project.
 - Add the following variables, replacing the placeholders:
     MONGODB_URI=<your-mongodb-connection-string>
     PORT=3001 

4. Start the Server: 

    node server.js

## API Documentation 

Video Tutorial and Demo: https://drive.google.com/file/d/14OF25oaMaSRqwwKHdLmhhE9P_xhPwSHf/view

For detailed descriptions, examples, and testing instructions for each API endpoint, please refer to the video tutorial.

## Contributing 

Contributions are welcome! To contribute, please follow these steps:

 1. Open an issue to discuss your proposed changes.
 2. Fork the repository and create a new branch for your changes.
 3. Submit a pull request with a clear explanation of your changes.

 ## Licesne 

 This project is licensed under the MIT License.  See the LICENSE: LICENSE file for details.