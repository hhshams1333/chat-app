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

