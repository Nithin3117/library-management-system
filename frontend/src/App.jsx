import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import IssueBook from "./pages/IssueBook";
import ReturnBook from "./pages/ReturnBook";
import Transactions from "./pages/Transactions";
import OverdueBooks from "./pages/OverdueBooks";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/issue"
        element={
          <ProtectedRoute>
            <IssueBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/return"
        element={
          <ProtectedRoute>
            <ReturnBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/overdue"
        element={
          <ProtectedRoute>
            <OverdueBooks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;