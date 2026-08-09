function TopBooks({ books }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Most Available Books
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Books currently having the highest availability
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Book
              </th>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Author
              </th>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Category
              </th>

              <th className="text-left p-4 text-gray-600 font-semibold">
                Available
              </th>

            </tr>

          </thead>

          <tbody>

            {books.length > 0 ? (
              books.map((book) => (

                <tr
                  key={book.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium text-gray-800">
                    {book.title}
                  </td>

                  <td className="p-4 text-gray-600">
                    {book.author || "Unknown"}
                  </td>

                  <td className="p-4 text-gray-600">
                    {book.category || "General"}
                  </td>

                  <td className="p-4">

                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      {book.available}
                    </span>

                  </td>

                </tr>

              ))
            ) : (
              <tr>

                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500"
                >
                  No books available
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default TopBooks;