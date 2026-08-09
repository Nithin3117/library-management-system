# Library Management System - Frontend

This is the frontend of the Library Management System built using React and Vite.

The application provides a user-friendly interface for managing books, students, library transactions and dashboard statistics.

## Features

- Admin login
- Dashboard
- Book management
- Student management
- Issue books
- Return books
- Transaction history
- Overdue books
- Fine information
- Book search
- Student search
- Toast notifications
- Loading states
- Dashboard statistics
- Library statistics chart
- Recent transactions
- Most available books

## Technologies Used

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Recharts
- React Icons
- React Toastify

## Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── hero.png
│   │
│   ├── components/
│   │   ├── Chart.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBooks.jsx
│   │
│   ├── pages/
│   │   ├── Books.jsx
│   │   ├── Dashboard.jsx
│   │   ├── IssueBook.jsx
│   │   ├── Login.jsx
│   │   ├── OverdueBooks.jsx
│   │   ├── ReturnBook.jsx
│   │   ├── Students.jsx
│   │   └── Transactions.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md