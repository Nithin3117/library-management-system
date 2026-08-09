import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function ReturnBook() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await api.get("/transactions/");

      const activeTransactions = res.data.filter(
        (transaction) => transaction.return_date === null
      );

      setTransactions(activeTransactions);
    } catch (err) {
      console.log(err);
      toast.error("Unable to Load Transactions");
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (id) => {
    try {
      await api.put(`/transactions/return/${id}`);

      toast.success("Book Returned Successfully");

      fetchTransactions();
    } catch (err) {
      console.log(err);

      const message =
        err.response?.data?.detail || "Unable to Return Book";

      toast.error(message);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Return Book
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Return Books...
                </p>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              <table className="w-full">

                <thead className="bg-blue-600 text-white">

                  <tr>
                    <th className="p-4">Transaction ID</th>
                    <th>Student</th>
                    <th>Book</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (

                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-100"
                      >

                        <td className="p-4">
                          {transaction.id}
                        </td>

                        <td>
                          {transaction.student_name ||
                            `Student ${transaction.student_id}`}
                        </td>

                        <td>
                          {transaction.book_title ||
                            `Book ${transaction.book_id}`}
                        </td>

                        <td>
                          {transaction.issue_date}
                        </td>

                        <td>
                          {transaction.due_date}
                        </td>

                        <td>

                          <button
                            onClick={() =>
                              returnBook(transaction.id)
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          >
                            Return
                          </button>

                        </td>

                      </tr>

                    ))
                  ) : (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center py-6 text-gray-500"
                      >
                        No books to return
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ReturnBook;