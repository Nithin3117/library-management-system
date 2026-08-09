# Library Management System

A full-stack web application developed to manage common library operations such as books, students, book issuing, returns, transactions, overdue books, and fine calculation.

The project has a React frontend and a FastAPI backend with SQLite as the database.

## Overview

The Library Management System provides a simple interface for managing library records digitally.

An administrator can manage books and students, issue books, process returns, view transaction history, and track overdue books and fines from a single application.

## Features

### Authentication
- Admin login
- JWT-based authentication
- Protected application access

### Dashboard
- Total number of books
- Available books
- Issued books
- Total students
- Library statistics chart
- Recent transactions
- Most available books

### Book Management
- Add new books
- Edit book details
- Delete books
- Search books
- Track total and available quantities

### Student Management
- Add students
- Edit student details
- Delete students
- Search students

### Book Transactions
- Issue books to students
- Set due dates
- Return issued books
- View complete transaction history
- Track returned and currently issued books

### Overdue Books
- View currently overdue books
- Calculate number of overdue days
- Calculate estimated fine
- Display student and book details

### Fine Calculation

The current fine calculation is based on the number of overdue days.

```text
Fine = Number of Overdue Days × ₹10
