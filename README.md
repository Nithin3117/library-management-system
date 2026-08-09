# Library Management System

A full-stack web application for managing library operations such as books, students, book issuing, book returns, transaction history, overdue books, and fine calculation.

The application is built using React for the frontend and FastAPI for the backend, with SQLAlchemy used for database operations and SQLite used as the database.

---

## Overview

The Library Management System provides a centralized platform for handling common library activities digitally.

The system allows an administrator to manage books and students, issue books, process returns, monitor transactions, identify overdue books, and view library statistics through a simple web interface.

The application is divided into two main parts:

- Frontend — React-based user interface
- Backend — FastAPI-based REST API

The frontend communicates with the backend through REST APIs, while the backend handles business logic and database operations.

---

## Features

### Authentication

- Admin login
- JWT-based authentication
- Access token generation
- Token verification
- Authentication API using FastAPI

### Dashboard

The dashboard provides an overview of the current library status.

It displays:

- Total books
- Available books
- Issued books
- Total students
- Library statistics
- Recent transactions
- Most available books

### Book Management

The book management module provides CRUD operations for library books.

Features include:

- Add books
- View books
- Edit book details
- Delete books
- Search books
- Track total quantity
- Track available quantity
- Store ISBN
- Store author
- Store category

### Student Management

The student management module provides CRUD operations for students.

Features include:

- Add students
- View students
- Edit student details
- Delete students
- Search students
- Store student name
- Store email
- Store phone number

### Issue Book

The Issue Book module allows an administrator to issue an available book to a student.

The system:

1. Verifies the selected student.
2. Verifies the selected book.
3. Checks whether the book is available.
4. Decreases the available book quantity.
5. Creates a transaction.
6. Stores the issue date.
7. Stores the selected due date.

### Return Book

The Return Book module displays currently issued books and allows the administrator to return them.

When a book is returned:

1. The transaction is verified.
2. The return status is checked.
3. The book availability is increased.
4. The return date is recorded.
5. The fine is calculated if the book is overdue.

### Transaction History

The transaction history module provides a complete record of library transactions.

It displays:

- Transaction ID
- Student
- Book
- Issue date
- Due date
- Return date
- Fine

### Overdue Books

The Overdue Books module identifies books that have not been returned and have passed their due date.

It displays:

- Student name
- Book title
- Issue date
- Due date
- Number of overdue days
- Estimated fine

### Fine Calculation

The current fine calculation is:

```text
Fine = Number of Overdue Days × ₹10
```

For example:

```text
5 overdue days × ₹10 = ₹50
```

---

## Technology Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React | Building the user interface |
| Vite | Frontend development and build tool |
| JavaScript | Application logic |
| React Router | Page navigation |
| Axios | Frontend-backend API communication |
| Tailwind CSS | Styling and responsive UI |
| Recharts | Dashboard charts |
| React Icons | UI icons |
| React Toastify | Success, warning, and error notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| Python | Backend programming |
| FastAPI | REST API development |
| SQLAlchemy | ORM and database operations |
| Pydantic | Request and response validation |
| JWT | Authentication |
| Uvicorn | Running the FastAPI application |

### Database

| Technology | Purpose |
|------------|---------|
| SQLite | Application database |
| SQLAlchemy ORM | Database interaction |

---

## System Architecture

The application follows a frontend-backend architecture.

```text
                    Library Management System
                              |
              +---------------+---------------+
              |                               |
              v                               v
       React Frontend                   FastAPI Backend
              |                               |
              |          REST APIs            |
              +--------------->---------------+
                                              |
                                              v
                                       SQLAlchemy ORM
                                              |
                                              v
                                         SQLite DB
```

### Request Flow

```text
User
  |
  v
React Interface
  |
  v
Axios API Request
  |
  v
FastAPI Route
  |
  v
CRUD Operations
  |
  v
SQLAlchemy
  |
  v
SQLite Database
  |
  v
API Response
  |
  v
React Interface
```

---

## Application Workflow

```text
                         Admin Login
                              |
                              v
                         Dashboard
                              |
             +----------------+----------------+
             |                |                |
             v                v                v
           Books           Students        Statistics
             |                |
             +-------+--------+
                     |
                     v
                Issue Book
                     |
                     v
                Return Book
                     |
             +-------+-------+
             |               |
             v               v
       Transactions    Overdue Books
                             |
                             v
                      Fine Calculation
```

---

## Project Structure

```text
library-management-system/

│

├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── books.py
│   │   │   ├── dashboard.py
│   │   │   ├── students.py
│   │   │   └── transactions.py
│   │   │
│   │   ├── auth.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── security.py
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Chart.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RecentTransactions.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── TopBooks.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Books.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IssueBook.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OverdueBooks.jsx
│   │   │   ├── ReturnBook.jsx
│   │   │   ├── Students.jsx
│   │   │   └── Transactions.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## Backend API

The backend provides REST APIs used by the React frontend.

### Authentication

```text
POST /auth/login
```

Used for administrator login and JWT token generation.

### Books

```text
POST   /books/
GET    /books/
GET    /books/{book_id}
PUT    /books/{book_id}
DELETE /books/{book_id}
```

### Students

```text
POST   /students/
GET    /students/
GET    /students/{student_id}
PUT    /students/{student_id}
DELETE /students/{student_id}
```

### Transactions

```text
POST /transactions/issue
PUT  /transactions/return/{transaction_id}
GET  /transactions/
GET  /transactions/overdue
```

### Dashboard

```text
GET /dashboard/
```

---

## Database Design

The application uses SQLite with SQLAlchemy ORM.

### Books

The Books table stores:

```text
id
title
author
category
isbn
quantity
available
```

### Students

The Students table stores:

```text
id
name
email
phone
```

### Transactions

The Transactions table stores:

```text
id
student_id
book_id
issue_date
due_date
return_date
fine
```

The transaction table connects students and books using foreign key relationships.

---

## Book Issue Logic

When a book is issued, the backend performs the following operations:

```text
Select Student
      |
      v
Check Student
      |
      v
Select Book
      |
      v
Check Book Availability
      |
      v
Decrease Available Quantity
      |
      v
Create Transaction
```

The transaction stores:

- Student ID
- Book ID
- Issue date
- Due date
- Initial fine

---

## Book Return Logic

When a book is returned:

```text
Select Transaction
      |
      v
Check Transaction
      |
      v
Check Return Status
      |
      v
Increase Book Availability
      |
      v
Set Return Date
      |
      v
Calculate Fine
      |
      v
Update Transaction
```

A transaction that has already been returned cannot be returned again.

---

## Overdue Logic

A transaction is considered overdue when:

```text
Return Date = NULL
AND
Due Date < Current Date
```

For every overdue transaction, the system calculates:

```text
Days Overdue = Current Date - Due Date

Estimated Fine = Days Overdue × ₹10
```

---

## Frontend Pages

### Login

Provides the administrator login interface.

### Dashboard

Displays library statistics, charts, recent transactions, and book availability.

### Books

Provides book management, CRUD operations, and search functionality.

### Students

Provides student management, CRUD operations, and search functionality.

### Issue Book

Allows the administrator to select a student, select an available book, and set a due date.

### Return Book

Displays currently issued books and provides an option to return them.

### Transactions

Displays the complete transaction history.

### Overdue Books

Displays active overdue transactions and their estimated fines.

---

## Frontend Components

The application uses reusable React components for common interface sections.

```text
components/
│
├── Chart.jsx
├── DashboardCard.jsx
├── Navbar.jsx
├── RecentTransactions.jsx
├── Sidebar.jsx
└── TopBooks.jsx
```

These components help keep the frontend organized and reusable.

---

## Running the Project Locally

### Prerequisites

Make sure the following are installed:

- Python
- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/Nithin3117/library-management-system.git
```

```bash
cd library-management-system
```

---

## Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend should be running before using the frontend.

---

## Environment Configuration

Sensitive configuration should be stored in a `.env` file.

Example:

```env
LIBRARY_SECRET_KEY=your_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

The `.env` file should not be committed to GitHub.

Sensitive information such as passwords, secret keys, and other private configuration values should never be uploaded to the repository.

---

## API Documentation

FastAPI provides interactive API documentation through Swagger UI.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to explore and test the available API endpoints.

---

## Project Highlights

- Full-stack React and FastAPI architecture
- REST API integration
- CRUD operations
- SQLAlchemy ORM
- SQLite database
- JWT-based authentication
- Book availability management
- Student management
- Book issue and return workflow
- Transaction management
- Overdue book tracking
- Automatic fine calculation
- Search functionality
- Dashboard statistics
- Reusable React components
- Loading states
- Toast notifications
- Separate frontend and backend structure

---

## Future Improvements

Possible improvements for future versions include:

- Role-based access for librarians and students
- Student login
- Book cover images
- Advanced filtering and pagination
- Email notifications for overdue books
- Book reservation and waiting-list functionality
- Improved reporting and analytics
- PostgreSQL for production use
- Automated testing
- Cloud deployment

---

## Project Purpose

This project was developed as a practical full-stack application to understand and implement:

- Frontend development using React
- Backend API development using FastAPI
- REST API communication
- Database operations using SQLAlchemy
- SQLite database management
- Authentication using JWT
- CRUD operations
- Frontend and backend integration
- Real-world library transaction workflows

The project focuses on building a complete working application rather than implementing isolated features.

---

## Author

**Nithin Bollineni**

GitHub: https://github.com/Nithin3117
