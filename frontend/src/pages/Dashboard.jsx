import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import Chart from "../components/Chart";
import RecentTransactions from "../components/RecentTransactions";
import TopBooks from "../components/TopBooks";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_books: 0,
    available_books: 0,
    issued_books: 0,
    students: 0,
  });

  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchDashboard(),
        fetchBooks(),
        fetchTransactions(),
        fetchOverdueBooks(),
      ]);
    } catch (err) {
      console.log(err);
      toast.error("Unable to Load Dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/");

      console.log("Dashboard:", res.data);

      setStats({
        total_books: res.data.total_books || 0,
        available_books: res.data.available_books || 0,
        issued_books: res.data.issued_books || 0,
        students: res.data.students || 0,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books/");

      setBooks(res.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions/");

      setTransactions(res.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchOverdueBooks = async () => {
    try {
      const res = await api.get("/transactions/overdue");

      setOverdueBooks(res.data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Calculate total estimated pending fine
  const totalEstimatedFine = overdueBooks.reduce(
    (total, book) => total + (book.estimated_fine || 0),
    0
  );

  const chartData = [
    {
      name: "Books",
      value: stats.total_books,
    },
    {
      name: "Available",
      value: stats.available_books,
    },
    {
      name: "Issued",
      value: stats.issued_books,
    },
    {
      name: "Students",
      value: stats.students,
    },
  ];

  const recentTransactions = transactions
    .slice(-5)
    .reverse()
    .map((transaction) => ({
      id: transaction.id,
      student:
        transaction.student_name ||
        `Student ${transaction.student_id}`,
      book:
        transaction.book_title ||
        `Book ${transaction.book_id}`,
      return_date: transaction.return_date,
    }));

  const topBooks = [...books]
    .sort((a, b) => b.available - a.available)
    .slice(0, 5);

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          {loading ? (

            <div className="flex justify-center items-center h-64">

              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Dashboard...
                </p>

              </div>

            </div>

          ) : (

            <>

              {/* Dashboard Cards */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">

                <DashboardCard
                  title="Total Books"
                  value={stats.total_books}
                  color="bg-blue-600"
                />

                <DashboardCard
                  title="Available Books"
                  value={stats.available_books}
                  color="bg-green-600"
                />

                <DashboardCard
                  title="Issued Books"
                  value={stats.issued_books}
                  color="bg-yellow-500"
                />

                <DashboardCard
                  title="Students"
                  value={stats.students}
                  color="bg-purple-600"
                />

                <DashboardCard
                  title="Overdue Books"
                  value={overdueBooks.length}
                  color="bg-red-600"
                />

                <DashboardCard
                  title="Pending Fine"
                  value={`₹${totalEstimatedFine}`}
                  color="bg-orange-500"
                />

              </div>

              {/* Library Statistics */}

              <Chart data={chartData} />

              {/* Overdue Books */}

              <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

                <div className="mb-6">

                  <h2 className="text-xl font-bold text-gray-800">
                    Overdue Books
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Books that have passed their due date
                  </p>

                </div>

                {overdueBooks.length > 0 ? (

                  <div className="overflow-x-auto">

                    <table className="w-full">

                      <thead className="bg-red-50">

                        <tr>

                          <th className="text-left p-4 text-gray-600 font-semibold">
                            Student
                          </th>

                          <th className="text-left p-4 text-gray-600 font-semibold">
                            Book
                          </th>

                          <th className="text-left p-4 text-gray-600 font-semibold">
                            Due Date
                          </th>

                          <th className="text-left p-4 text-gray-600 font-semibold">
                            Days Overdue
                          </th>

                          <th className="text-left p-4 text-gray-600 font-semibold">
                            Estimated Fine
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {overdueBooks.map((transaction) => (

                          <tr
                            key={transaction.id}
                            className="border-b hover:bg-red-50 transition"
                          >

                            <td className="p-4 font-medium text-gray-800">
                              {transaction.student_name}
                            </td>

                            <td className="p-4 text-gray-600">
                              {transaction.book_title}
                            </td>

                            <td className="p-4 text-gray-600">
                              {transaction.due_date}
                            </td>

                            <td className="p-4">

                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                                {transaction.days_overdue} days
                              </span>

                            </td>

                            <td className="p-4 font-bold text-red-600">
                              ₹ {transaction.estimated_fine}
                            </td>

                          </tr>

                        ))}

                      </tbody>

                    </table>

                  </div>

                ) : (

                  <div className="text-center py-8">

                    <p className="text-green-600 text-lg font-semibold">
                      ✓ No overdue books
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      All issued books are within their due dates.
                    </p>

                  </div>

                )}

              </div>

              {/* Recent Transactions */}

              <RecentTransactions
                transactions={recentTransactions}
              />

              {/* Most Available Books */}

              <TopBooks
                books={topBooks}
              />

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;