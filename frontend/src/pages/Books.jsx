import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    quantity: "",
    available: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/books/");

      setBooks(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to Load Books");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const addBook = () => {
    api
      .post("/books/", {
        ...newBook,
        quantity: Number(newBook.quantity),
        available: Number(newBook.available),
      })
      .then(() => {
        fetchBooks();

        setNewBook({
          title: "",
          author: "",
          category: "",
          isbn: "",
          quantity: "",
          available: "",
        });

        toast.success("Book Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Add Book");
      });
  };

  const deleteBook = (id) => {
    if (!window.confirm("Delete this book?")) {
      return;
    }

    api
      .delete(`/books/${id}`)
      .then(() => {
        fetchBooks();
        toast.success("Book Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Delete Book");
      });
  };

  const editBook = (book) => {
    setEditingId(book.id);

    setNewBook({
      title: book.title,
      author: book.author,
      category: book.category,
      isbn: book.isbn,
      quantity: book.quantity,
      available: book.available,
    });
  };

  const updateBook = () => {
    api
      .put(`/books/${editingId}`, {
        ...newBook,
        quantity: Number(newBook.quantity),
        available: Number(newBook.available),
      })
      .then(() => {
        fetchBooks();

        setEditingId(null);

        setNewBook({
          title: "",
          author: "",
          category: "",
          isbn: "",
          quantity: "",
          available: "",
        });

        toast.success("Book Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Update Book");
      });
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Books Management
          </h1>

          {/* Loading */}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Books...
                </p>

              </div>
            </div>
          ) : (
            <>
              {/* Add / Edit Book */}

              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

                <h2 className="text-xl font-bold mb-4">
                  {editingId ? "Edit Book" : "Add New Book"}
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newBook.category}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={newBook.isbn}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newBook.quantity}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="number"
                    name="available"
                    placeholder="Available"
                    value={newBook.available}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                </div>

                {editingId ? (
                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={updateBook}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                    >
                      Update Book
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(null);

                        setNewBook({
                          title: "",
                          author: "",
                          category: "",
                          isbn: "",
                          quantity: "",
                          available: "",
                        });
                      }}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>

                  </div>
                ) : (
                  <button
                    onClick={addBook}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Add Book
                  </button>
                )}

              </div>

              {/* Search */}

              <div className="mb-6">

                <input
                  type="text"
                  placeholder="Search by Title, Author, Category or ISBN..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              {/* Books Table */}

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                  <thead className="bg-blue-600 text-white">

                    <tr>
                      <th className="p-4">ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>ISBN</th>
                      <th>Quantity</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (

                        <tr
                          key={book.id}
                          className="border-b hover:bg-gray-100"
                        >

                          <td className="p-4">
                            {book.id}
                          </td>

                          <td>
                            {book.title}
                          </td>

                          <td>
                            {book.author}
                          </td>

                          <td>
                            {book.category}
                          </td>

                          <td>
                            {book.isbn}
                          </td>

                          <td>
                            {book.quantity}
                          </td>

                          <td>
                            {book.available}
                          </td>

                          <td>

                            <button
                              onClick={() => editBook(book)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteBook(book.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))
                    ) : (
                      <tr>

                        <td
                          colSpan="8"
                          className="text-center p-8 text-gray-500"
                        >
                          No books found
                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Books;