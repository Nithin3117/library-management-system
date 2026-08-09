import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await api.get("/transactions/");

      console.log("Transactions API Response:", res.data);

      setTransactions(res.data);
    } catch (err) {
      console.log("API Error:", err);
      toast.error("Unable to Load Transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Transaction History
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Transactions...
                </p>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              <table className="w-full">

                <thead className="bg-blue-600 text-white">

                  <tr>
                    <th className="p-4">ID</th>
                    <th>Student</th>
                    <th>Book</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Fine</th>
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
                          {transaction.return_date ||
                            "Not Returned"}
                        </td>

                        <td>
                          ₹ {transaction.fine || 0}
                        </td>

                      </tr>

                    ))
                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No transactions found
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

export default Transactions;