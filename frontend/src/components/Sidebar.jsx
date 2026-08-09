import { Link } from "react-router-dom";

import {
  FaBook,
  FaUserGraduate,
  FaExchangeAlt,
  FaChartBar,
  FaExclamationTriangle,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-blue-600 text-white shadow-xl">

      <div className="p-6 text-2xl font-bold">
          Library LMS
      </div>

      <nav className="mt-6">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaChartBar />
          Dashboard
        </Link>

        <Link
          to="/books"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaBook />
          Books
        </Link>

        <Link
          to="/students"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaUserGraduate />
          Students
        </Link>

        <Link
          to="/issue"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaExchangeAlt />
          Issue Book
        </Link>

        <Link
          to="/return"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaExchangeAlt />
          Return Book
        </Link>

        <Link
          to="/overdue"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaExclamationTriangle />
          Overdue Books
        </Link>

        <Link
          to="/transactions"
          className="flex items-center gap-3 px-6 py-4 hover:bg-blue-700"
        >
          <FaExchangeAlt />
          Transaction History
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;