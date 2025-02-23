
## Project Overview
This project is a **NestJS-based chat and authentication system** that allows users to register, log in, and join chat rooms. It provides the following key features:
- **User Authentication**: Users can register and log in using JWT authentication.
- **Chat Rooms**: Users can create chat rooms, join existing ones, and send messages.
- **Rate Limiting**: The application uses throttling to prevent excessive requests.
- **Security Measures**: Helmet is used for basic security enhancements.

# Instructions on How to Set Up and Run the Application

## Prerequisites
Before setting up the application, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (if running outside Docker)
- PostgreSQL (if running outside Docker)

## Environment Variables
Create a `.env` file in the root directory and set up the required environment variables:

```env
# Server
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Database
DB_HOST=database
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name

# JWT Secret
JWT_SECRET=your_jwt_secret
```

## Running with Docker
1. **Build and start the application:**
   ```sh
   docker-compose up --build
   ```

2. **Stopping the application:**
   ```sh
   docker-compose down
   ```

## Running Locally (Without Docker)
1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run database migrations (if necessary):**
   ```sh
   npm run typeorm migration:run
   ```

3. **Start the application:**
   ```sh
   npm run start
   ```

4. The server will start at `http://localhost:3000`

## Testing
To run unit tests:
```sh
npm run test
```


# Chat and Authentication API Documentation

## Authentication API

### `POST /auth/register`
Registers a new user.

#### Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```
#### Response:
Returns the created user object.

---

### `POST /auth/login`
Logs in a user and returns a JWT token.

#### Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```
#### Response:
```json
{
  "access_token": "string"
}
```

## Chat API

### `POST /chat/rooms`
Creates a new chat room.

#### Request Body:
```json
{
  "name": "string"
}
```
#### Response:
Returns the created chat room object.

---

### `POST /chat/rooms/join`
Joins an existing chat room.

#### Request Body:
```json
{
  "id": "number"
}
```
#### Response:
Returns the chat room details.

---

### `POST /chat/rooms/:id/messages`
Sends a message to a chat room.

#### Path Parameter:
- `id` (Chat Room ID)

#### Request Body:
```json
{
  "content": "string"
}
```
#### Response:
Returns the created message object.

---

### `GET /chat/rooms/:id/messages`
Retrieves messages from a chat room.

#### Path Parameter:
- `id` (Chat Room ID)

#### Response:
Returns an array of messages.

