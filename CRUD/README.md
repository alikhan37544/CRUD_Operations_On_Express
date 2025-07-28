# CRUD Operations on Express.js

This project demonstrates how to build simple CRUD (Create, Read, Update, Delete) APIs using Express.js in Node.js. It includes two versions:

- **Basic CRUD with in-memory storage** (`index.js`)
- **CRUD with persistent MySQL database** (`index_mysql.js`)

---

## 1. Basic CRUD (In-Memory)

### How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node index.js
   ```
3. The server will run at [http://localhost:3000](http://localhost:3000)

### Endpoints
- `POST   /users` — Create a new user
- `GET    /users` — Get all users
- `GET    /users/:id` — Get a user by ID
- `PUT    /users/:id` — Update a user by ID
- `DELETE /users/:id` — Delete a user by ID

> **Note:** Data is stored in memory and will be lost when the server restarts.

---

## 2. CRUD with MySQL (Persistent)

### Prerequisites
- MySQL server running locally
- Node.js and npm installed

### MySQL Setup
1. Log into your MySQL shell:
   ```bash
   mysql -u root -p
   ```
2. Create the database and table:
   ```sql
   CREATE DATABASE IF NOT EXISTS crud_demo;
   USE crud_demo;
   DROP TABLE IF EXISTS users;
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     firstName VARCHAR(255) NOT NULL,
     lastName VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phoneNumber VARCHAR(50) NOT NULL
   );
   ```

### How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Make sure your MySQL credentials in `index_mysql.js` are correct (default is user `root`, password `admin`, database `crud_demo`).
3. Start the server:
   ```bash
   node index_mysql.js
   ```
4. The server will run at [http://localhost:3000](http://localhost:3000)

### Endpoints
- `POST   /users` — Create a new user (fields: firstName, lastName, email, phoneNumber)
- `GET    /users` — Get all users
- `GET    /users/:id` — Get a user by ID
- `PUT    /users/:id` — Update a user by ID (all fields required)
- `DELETE /users/:id` — Delete a user by ID

---

## Personal Note

> Very badly needed clarity! I had used the POST, GET requests and all before, in Flask on Python, but I didn't know how to call and handle errors properly, and did not know how to do it in JavaScript before. This project helped me understand how to structure routes, handle errors, and work with both in-memory and persistent storage in Express.js. 