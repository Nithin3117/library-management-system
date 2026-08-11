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

## Deployment

The application is deployed as separate frontend and backend services.

### Frontend

The React frontend is deployed using Vercel.

### Backend

The FastAPI backend is deployed using Render.

The frontend communicates with the deployed FastAPI backend through the configured API URL.

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
- Live frontend and backend deployment

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
- Cloud deployment improvements

---

---

## Author

Nithin Bollineni

GitHub: https://github.com/Nithin3117

Live Website: https://library-management-system-beta-nine-79.vercel.app
