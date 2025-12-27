# ⚙️ Expense Tracker - Backend

This is the backend API for the Expense Tracker application, built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 API Features

- **Auth System**: Registration and Login with JWT token generation.
- **Expense CRUD**: Full Create, Read, Update, Delete functionality for transactions.
- **Middleware**: Protected routes using authentication middleware.
- **Database**: Mongoose schemas with validation for data integrity.

---

## 🛠 Project Structure

```text
backend/
├── auth/          # Authentication logic (JWT)
├── controller/    # Route controllers (Logic)
├── models/        # Mongoose Data Models
├── route/         # Express Route definitions
└── api/index.js   # Main entry point
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Create a new user account.
- `POST /auth/login` - Authenticate and get a token.

### Transactions
- `GET /expenses` - Retrieve all expenses for the logged-in user.
- `POST /expenses` - Add a new expense.
- `DELETE /expenses/:id` - Remove an expense.

---

## 🛠️ Performance & Security

- **Bcrypt**: For hashing sensitive user passwords.
- **CORS**: Configured for secure frontend-backend communication.
- **Dotenv**: Environment variable management.

---

## 💻 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in `.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
3. Start the server:
   ```bash
   node api/index.js
   ```
