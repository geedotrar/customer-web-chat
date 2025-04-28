# Express Api 

A RESTful API built with Express.js, Sequelize ORM, MySQL, and JWT for secure user registration, login, and profile management,leads.

## Features

- User registration with validation
- Secure login with JWT authentication
- Protected profile route and leads route
- Password hashing with bcrypt
- Input validation with express-validator
- Containerized MySQL database with Docker

## Tech Stack

- Node.js/Express.js
- Sequelize ORM
- MySQL
- Docker
- JWT for authentication
- bcrypt for password hashing

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Copy the .env.example file and rename it to .env:
   ```
   cp .env.example .env
   ```

4. Start the MySQL database with Docker:
   ```
   docker-compose up -d
   ```

5. Run the migrations:
   ```
   npm run migrate
   ```

6. Start the application:
   ```
   npm run dev
   ```

## API Endpoints

### User Registration
```
POST /api/register
```
**Request Body:**
```json
{
  "email": "flin@mail.com",
  "password": "password1@",
  "name": "Flin"
}
```
**Validation Rules:**
- Email must be valid
- Name is required
- Password must be at least 8 characters long
- Password must contain at least one number
- Password must contain at least one special character

**Response:**
```json
{
    "status": 201,
    "message": "User registerd successfully",
    "data": {
        "id": 1,
        "name": "Flin",
        "email": "flin@mail.com",
        "password": "$2b$10$0OU5JblKY10HlzdM5D/pNekHyojHnFR5X7wgSaxHzWKwdXKBW7boG",
        "updatedAt": "2025-04-27T18:45:06.922Z",
        "createdAt": "2025-04-27T18:45:06.922Z"
    },
    "error": false
}
```
### User Login
```
POST /api/login
```
**Request Body:**
```json
{
  "email": "flin@mail.com",
  "password": "password1@"
}
```
**Response:**
```json
{
  "status": 201,
  "message": "User login successfully",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ1Nzc5Njg4LCJleHAiOjE3NDU3ODMyODh9.Ybk_ChkWxpLWanbICA-9LeSsx9HyegaUET3EAUTq354",
  "error": false
}
```

### Get User Profile
```
GET /api/profile
```
**Headers:**
```
Authorization: Bearer <jwt_token>
```
**Response:**
```json
{
  "status": 200,
  "message": "Get profile successfully",
  "data": {
      "id": 1,
      "name": "Flin",
      "email": "flin@mail.com"
  },
  "error": false
}
```

### Chat Bot
```
POST /api/chat
```
**Request Body:**
```json
{
  "message": "What is loan consolidation?"
}

```
**Response:**
```json
{
  "reply": "Simply put, debt consolidation is the process of combining multiple debts into a single loan. This process is often used to manage complex financial obligations, such as credit card debt, personal loans, or small business loans."
}
```

### Create Lead
```
POST /api/leads
```
**Request Body:**
```json
{
  "name": "flin",
  "phone": "+12345678910",
  "email": "flin@example.com",
  "loanType": "Personal Loan Consolidation"
}
```
**Validation Rules:**
- Name: Required field (cannot be empty).
- Phone: Required field, must be a valid phone number.
- Email: Required field, must be a valid email format.
- LoanType: Required field, must be one of the following:
    - Personal Loan Consolidation
    - Credit Card Installment Consolidation
    - Paylater Loan Consolidation
    - Online Loan Consolidation

**Response:**
```json
{
  "status": 201,
  "message": "Lead created successfully",
  "data": {
      "id": 1,
      "name": "flin",
      "phone": "+12345678910",
      "email": "flin@example.com",
      "loanType": "Personal Loan Consolidation",
      "updatedAt": "2025-04-27T18:59:55.752Z",
      "createdAt": "2025-04-27T18:59:55.752Z"
  },
  "error": false
}
```
### Get Leads
```
GET /api/leads
```
**Response:**
```json
{
  "status": 200,
  "message": "Leads retrieved successfully",
  "data": {
    "leads": [
        {
          "id": 2,
          "name": "flin",
          "phone": "+12345678910",
          "email": "flin@example.com",
          "loanType": "Personal Loan Consolidation",
          "createdAt": "2025-04-27T18:59:55.000Z",
          "updatedAt": "2025-04-27T18:59:55.000Z"
        },
        {
          "id": 1,
          "name": "test",
          "phone": "123123123",
          "email": "test@mail.com",
          "loanType": "Personal Loan Consolidation",
          "createdAt": "2025-04-27T17:36:01.000Z",
          "updatedAt": "2025-04-27T17:36:01.000Z"
        }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalLeads": 2,
      "limit": 5
    }
  },
  "error": false
}
```
