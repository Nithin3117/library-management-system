# Library Management System

A full-stack web-based Library Management System developed using React and FastAPI. The application provides a centralized interface for managing books, students, book issue and return operations, transaction history, overdue books, and fine calculation.

The project follows a frontend-backend architecture where the React application communicates with REST APIs provided by FastAPI. SQLAlchemy is used for database operations with SQLite as the database.

---

## Project Overview

The Library Management System is designed to simplify common library management activities and reduce manual record keeping.

The system provides an administrator with a dashboard to monitor library activity and dedicated modules for managing books, students, and transactions.

The main operations supported by the application are:

- Managing books
- Managing students
- Issuing books
- Returning books
- Maintaining transaction history
- Tracking overdue books
- Calculating fines
- Viewing library statistics
- Admin authentication

---

## Key Features

### Authentication

- Admin login
- JWT-based authentication
- Secure token generation and verification
- Authentication API using FastAPI

### Dashboard

The dashboard provides an overview of the current library status.

It displays:

- Total books
- Available books
- Issued books
- Total students
- Library statistics chart
- Recent transactions
- Most available books

### Book Management

- Add new books
- View all books
- Edit book information
- Delete books
- Search books
- Track total quantity
- Track available quantity
- Store ISBN, author, and category information

### Student Management

- Add students
- View students
- Edit student information
- Delete students
- Search students
- Store student name, email, and phone number

### Issue Book

The issue module allows an administrator to issue an available book to a student.

The system:

1. Verifies the selected student.
2. Verifies the selected book.
3. Checks book availability.
4. Decreases the available book quantity.
5. Creates a transaction record.
6. Stores the issue date and due date.

### Return Book

When a book is returned:

1. The transaction is verified.
2. The return status is checked.
3. The book availability is increased.
4. The return date is recorded.
5. The fine is calculated if the book is overdue.

### Transaction History

The transaction history displays:

- Transaction ID
- Student
- Book
- Issue date
- Due date
- Return date
- Fine

### Overdue Books

The system identifies books that have not been returned and have passed their due date.

The overdue module displays:

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
