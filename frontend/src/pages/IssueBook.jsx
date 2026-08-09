import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function IssueBook() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    student_id: "",
    book_id: "",
    due_date: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [studentsResponse, booksResponse] = await Promise.all([
        api.get("/students/"),
        api.get("/books/"),
      ]);

      setStudents(studentsResponse.data);
      setBooks(booksResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to Load Issue Book Data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const issueBook = () => {
    if (!form.student_id || !form.book_id || !form.due_date) {
      toast.warning("Please fill all fields");
      return;
    }

    api
      .post("/transactions/issue", {
        student_id: Number(form.student_id),
        book_id: Number(form.book_id),
        due_date: form.due_date,
      })
      .then(() => {
        toast.success("Book Issued Successfully");

        setForm({
          student_id: "",
          book_id: "",
          due_date: "",
        });

        loadData();
      })
      .catch((err) => {
        console.log(err);

        const message =
          err.response?.data?.detail || "Unable to Issue Book";

        toast.error(message);
      });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Issue Book
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Issue Book...
                </p>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl">

              {/* Student */}

              <div className="mb-5">

                <label className="font-semibold">
                  Student
                </label>

                <select
                  name="student_id"
                  value={form.student_id}
                  onChange={handleChange}
                  className="w-full border rounded p-3 mt-2"
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (
                    <option
                      key={student.id}
                      value={student.id}
                    >
                      {student.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* Book */}

              <div className="mb-5">

                <label className="font-semibold">
                  Book
                </label>

                <select
                  name="book_id"
                  value={form.book_id}
                  onChange={handleChange}
                  className="w-full border rounded p-3 mt-2"
                >

                  <option value="">
                    Select Book
                  </option>

                  {books
                    .filter((book) => book.available > 0)
                    .map((book) => (
                      <option
                        key={book.id}
                        value={book.id}
                      >
                        {book.title}
                      </option>
                    ))}

                </select>

              </div>

              {/* Due Date */}

              <div className="mb-6">

                <label className="font-semibold">
                  Due Date
                </label>

                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full border rounded p-3 mt-2"
                />

              </div>

              {/* Issue Button */}

              <button
                onClick={issueBook}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Issue Book
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default IssueBook;