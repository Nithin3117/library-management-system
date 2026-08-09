import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function OverdueBooks() {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverdueBooks();
  }, []);

  const fetchOverdueBooks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/transactions/overdue");

      setOverdueBooks(res.data);
    } catch (err) {
      console.log(err);

      const message =
        err.response?.data?.detail ||
        "Unable to Load Overdue Books";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const totalFine = overdueBooks.reduce(
    (total, book) =>
      total + (book.estimated_fine || 0),
    0
  );

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">

        <Navbar />

        <div className="p-8">

          {/* Page Header */}

          <div className="flex justify-between items-center mb-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Overdue Books
              </h1>

              <p className="text-gray-500 mt-1">
                Books that have passed their due date
              </p>

            </div>

          </div>

          {loading ? (

            /* Loading */

            <div className="flex justify-center items-center h-64">

              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Overdue Books...
                </p>

              </div>

            </div>

          ) : (

            <>

              {/* Summary Cards */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">

                  <p className="text-lg">
                    Overdue Books
                  </p>

                  <p className="text-4xl font-bold mt-2">
                    {overdueBooks.length}
                  </p>

                </div>

                <div className="bg-orange-500 text-white rounded-xl shadow-lg p-6">

                  <p className="text-lg">
                    Estimated Pending Fine
                  </p>

                  <p className="text-4xl font-bold mt-2">
                    ₹ {totalFine}
                  </p>

                </div>

              </div>

              {/* Overdue Books Table */}

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <div className="p-6 border-b">

                  <h2 className="text-xl font-bold text-gray-800">
                    Overdue Book Details
                  </h2>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead className="bg-red-600 text-white">

                      <tr>

                        <th className="p-4 text-left">
                          Transaction ID
                        </th>

                        <th className="p-4 text-left">
                          Student
                        </th>

                        <th className="p-4 text-left">
                          Book
                        </th>

                        <th className="p-4 text-left">
                          Issue Date
                        </th>

                        <th className="p-4 text-left">
                          Due Date
                        </th>

                        <th className="p-4 text-left">
                          Days Overdue
                        </th>

                        <th className="p-4 text-left">
                          Estimated Fine
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {overdueBooks.length > 0 ? (

                        overdueBooks.map((transaction) => (

                          <tr
                            key={transaction.id}
                            className="border-b hover:bg-red-50 transition"
                          >

                            <td className="p-4">
                              {transaction.id}
                            </td>

                            <td className="p-4 font-medium text-gray-800">
                              {transaction.student_name}
                            </td>

                            <td className="p-4 text-gray-700">
                              {transaction.book_title}
                            </td>

                            <td className="p-4 text-gray-600">
                              {transaction.issue_date}
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

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center py-12"
                          >

                            <p className="text-green-600 text-lg font-semibold">
                              ✓ No Overdue Books
                            </p>

                            <p className="text-gray-500 text-sm mt-2">
                              All issued books are within their due dates.
                            </p>

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
}

export default OverdueBooks;