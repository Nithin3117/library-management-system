# Library Management System - Backend

This is the backend of the Library Management System built using FastAPI, SQLAlchemy and SQLite.

The backend provides REST APIs for managing books, students, library transactions, authentication and dashboard statistics.

## Features

- Admin login with JWT authentication
- Book management
  - Add books
  - View books
  - Update books
  - Delete books
- Student management
  - Add students
  - View students
  - Update students
  - Delete students
- Book issue management
- Book return management
- Transaction history
- Overdue book tracking
- Fine calculation
- Dashboard statistics
- SQLite database
- CORS support
- REST API documentation through FastAPI

## Technologies Used

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- JWT
- Uvicorn

## Project Structure

```text
backend/
│
├── app/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── books.py
│   │   ├── students.py
│   │   ├── transactions.py
│   │   └── dashboard.py
│   │
│   ├── auth.py
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── security.py
│
├── .env
├── .gitignore
├── library.db
├── requirements.txt
└── README.md