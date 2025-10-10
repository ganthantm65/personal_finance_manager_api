# Personal Finance Manager API

A backend REST API built with **Node.js**, **Express**, and **MongoDB** to help users manage their personal finances: accounts, income/expenses, budgets, transfers, savings goals, etc. Supports authentication via JWT, atomic transactions, and multi-user isolation.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
  - [User / Auth Routes](#user--auth-routes)
  - [Accounts](#accounts)
  - [Transactions](#transactions)
  - [Budgets](#budgets)
  - [Goals](#goals)
- [Architecture & Design](#architecture--design)
- [Error Handling & Responses](#error-handling--responses)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ✅ User registration and login with JWT-based authentication
- ✅ CRUD operations for accounts (e.g. bank accounts, wallets, credit cards)
- ✅ Record income and expense transactions
- ✅ Transfer funds between accounts with atomic operations
- ✅ Create and manage budgets with spending tracking
- ✅ Set and track savings goals
- ✅ Enforce data isolation: each user sees only their data
- ✅ Middleware for authorization and request validation
- ✅ Clean modular architecture (controllers, routes, models, middleware)

---

## Tech Stack

- **Node.js / Express** — HTTP server and routing
- **MongoDB** — Database for persistence
- **Mongoose** — ODM (Object Data Modeling) for schemas and models
- **jsonwebtoken** — JWT generation and verification
- **bcryptjs** — Secure password hashing
- Custom error handling and middleware layers

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ganthantm65/personal_finance_manager_api.git
cd personal_finance_manager_api
```

2. Install dependencies:
```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/personal-finance
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

**Note:** Replace the values with your actual configuration. For production, use a strong JWT_SECRET and a secure MongoDB connection string.

### Running the Application

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT).

---

## API Documentation

### Base URL

```
http://localhost:<PORT>/api
```

### Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The authentication middleware (`isAuth`) verifies the JWT and attaches `req.userId` or `req.user` to the request object.

---

### User / Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT token | No |
| GET | `/auth/me` | Get logged-in user profile | Yes |
| PUT | `/auth/update` | Update user details (name, password) | Yes |

#### Register User

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "error": false,
  "message": "User registered successfully",
  "data": {
    "userId": "user_id",
    "email": "john@example.com"
  }
}
```

#### Login User

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "error": false,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get User Profile

**Endpoint:** `GET /auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "error": false,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Update User

**Endpoint:** `PUT /auth/update`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "password": "newPassword123"
}
```

---

### Accounts

Manage financial accounts (bank accounts, wallets, credit cards, etc.)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/accounts` | List all user's accounts | Yes |
| POST | `/accounts` | Create a new account | Yes |
| GET | `/accounts/:id` | Get single account by ID | Yes |
| PUT | `/accounts/:id` | Update account details | Yes |
| DELETE | `/accounts/:id` | Delete account | Yes |

#### Create Account

**Endpoint:** `POST /accounts`

**Request Body:**
```json
{
  "name": "Checking Account",
  "type": "bank",
  "balance": 5000,
  "currency": "USD"
}
```

#### List Accounts

**Endpoint:** `GET /accounts`

**Response:**
```json
{
  "error": false,
  "data": [
    {
      "id": "account_id",
      "name": "Checking Account",
      "type": "bank",
      "balance": 5000,
      "currency": "USD"
    }
  ]
}
```

---

### Transactions

Track income, expenses, and transfers between accounts.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/transactions` | List all transactions (with filters) | Yes |
| POST | `/transactions/income` | Record income transaction | Yes |
| POST | `/transactions/expense` | Record expense transaction | Yes |
| POST | `/transactions/transfer` | Transfer funds between accounts | Yes |
| GET | `/transactions/:id` | Get single transaction | Yes |
| PUT | `/transactions/:id` | Update transaction | Yes |
| DELETE | `/transactions/:id` | Delete transaction | Yes |

#### Query Filters (GET /transactions)

- `date` — Filter by date or date range
- `type` — Filter by transaction type (income/expense/transfer)
- `account` — Filter by account ID

#### Record Income

**Endpoint:** `POST /transactions/income`

**Request Body:**
```json
{
  "account": "account_id",
  "amount": 3000,
  "category": "Salary",
  "description": "Monthly salary",
  "date": "2025-10-10"
}
```

#### Record Expense

**Endpoint:** `POST /transactions/expense`

**Request Body:**
```json
{
  "account": "account_id",
  "amount": 150,
  "category": "Groceries",
  "description": "Weekly shopping",
  "date": "2025-10-10"
}
```

#### Transfer Between Accounts

**Endpoint:** `POST /transactions/transfer`

**Request Body:**
```json
{
  "fromAccount": "account_id_1",
  "toAccount": "account_id_2",
  "amount": 500,
  "description": "Transfer to savings",
  "date": "2025-10-10"
}
```

**Note:** Transfer operations are **atomic** — funds are debited from one account and credited to another in a single database transaction using MongoDB sessions, ensuring data consistency.

---

### Budgets

Create and manage spending budgets by category.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/budgets` | List all budgets | Yes |
| POST | `/budgets` | Create a budget | Yes |
| GET | `/budgets/:id` | Get budget details | Yes |
| PUT | `/budgets/:id` | Update budget | Yes |
| DELETE | `/budgets/:id` | Delete budget | Yes |

#### Create Budget

**Endpoint:** `POST /budgets`

**Request Body:**
```json
{
  "category": "Groceries",
  "amount": 500,
  "period": "monthly",
  "startDate": "2025-10-01"
}
```

---

### Goals

Set and track savings goals.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/goals` | List all savings goals | Yes |
| POST | `/goals` | Create a goal | Yes |
| GET | `/goals/:id` | Get goal details | Yes |
| PUT | `/goals/:id` | Update goal | Yes |
| DELETE | `/goals/:id` | Delete goal | Yes |

#### Create Goal

**Endpoint:** `POST /goals`

**Request Body:**
```json
{
  "name": "Vacation Fund",
  "targetAmount": 5000,
  "currentAmount": 1200,
  "deadline": "2026-06-01"
}
```

---

## Architecture & Design

### Project Structure

```
personal_finance_manager_api/
├── src/
│   ├── models/          # Mongoose schemas (User, Account, Transaction, Budget, Goal)
│   ├── controllers/     # Business logic for each domain
│   ├── routes/          # API endpoint definitions
│   ├── middleware/      # Auth, validation, error handling
│   ├── services/        # Shared business logic (optional)
│   └── utils/           # Helper functions
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── server.js            # Entry point
```

### Components

**Models (Mongoose Schemas):**
- `User` — User authentication and profile data
- `Account` — Financial accounts (bank, wallet, credit card)
- `Transaction` — Income, expense, and transfer records
- `Budget` — Budget planning and tracking
- `Goal` — Savings goals with progress tracking

**Controllers:**
- Business logic for each domain (auth, accounts, transactions, budgets, goals)
- Handle request processing and response formatting

**Routes:**
- Define API endpoints
- Attach middleware (authentication, validation)
- Map endpoints to controller functions

**Middleware:**
- `isAuth` — JWT verification and user authentication
- `errorHandler` — Centralized error handling
- `validation` — Request data validation

**Services (Optional):**
- Shared logic for complex operations
- Transaction processing with atomicity
- Balance calculations

### Data Consistency

**Transfer Operations:**
- Use MongoDB sessions/transactions for atomic operations
- Implement two-phase logic to ensure:
  - Funds are properly debited from source account
  - Funds are properly credited to destination account
  - Both operations succeed or both fail (rollback)

---

## Error Handling & Responses

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (missing/invalid token) |
| `403` | Forbidden (insufficient permissions) |
| `404` | Resource not found |
| `500` | Internal server error |

### Response Format

**Success Response:**
```json
{
  "error": false,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response:**
```json
{
  "error": true,
  "message": "Error description",
  "details": {}
}
```

---

## Testing

To run tests (if configured):

```bash
npm test
```

**Recommended Testing Tools:**
- Jest or Mocha for unit tests
- Supertest for API endpoint testing
- MongoDB Memory Server for test database

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

## Contact

**Project Link:** [https://github.com/ganthantm65/personal_finance_manager_api](https://github.com/ganthantm65/personal_finance_manager_api)

For questions or support, please open an issue on GitHub.

---

## Acknowledgments

- Express.js documentation
- MongoDB and Mongoose documentation
- JWT best practices
- Open-source community
