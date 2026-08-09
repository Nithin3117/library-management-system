function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Transactions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Latest book issue and return activity
          </p>
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Student
              </th>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Book
              </th>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.length > 0 ? (
              transactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium text-gray-800">
                    {transaction.student}
                  </td>

                  <td className="p-4 text-gray-600">
                    {transaction.book}
                  </td>

                  <td className="p-4">

                    {transaction.return_date ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        Returned
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                        Issued
                      </span>
                    )}

                  </td>

                </tr>

              ))
            ) : (
              <tr>

                <td
                  colSpan="3"
                  className="text-center py-8 text-gray-500"
                >
                  No recent transactions
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentTransactions;