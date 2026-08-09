# 📚 Library Management System

A full-stack Library Management System built with **React** and **FastAPI** to manage books, students, book transactions, returns, overdue books, and fines through a simple web interface.

## ✨ Features

- 🔐 Admin Login
- 📊 Dashboard with library statistics
- 📚 Book Management
  - Add books
  - Edit books
  - Delete books
  - Search books
  - Track book availability
- 👨‍🎓 Student Management
  - Add students
  - Edit students
  - Delete students
  - Search students
- 📖 Issue Books
- 🔄 Return Books
- 📋 Transaction History
- ⏰ Overdue Book Tracking
- 💰 Automatic Fine Calculation
- 🔔 Toast Notifications
- 📈 Library Statistics Chart
- 🕒 Recent Transactions
- 📚 Most Available Books

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Recharts
- React Icons
- React Toastify

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Uvicorn

### Database

- SQLite

## 🏗️ Project Structure

```text
library-management-system/
│
├── backend/
│   ├── app/
│   │   ├── routes/
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
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
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
