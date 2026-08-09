import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await api.get("/students/");

      setStudents(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to Load Students");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const addStudent = () => {
    api
      .post("/students/", newStudent)
      .then(() => {
        fetchStudents();

        setNewStudent({
          name: "",
          email: "",
          phone: "",
        });

        toast.success("Student Added Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Add Student");
      });
  };

  const editStudent = (student) => {
    setEditingId(student.id);

    setNewStudent({
      name: student.name,
      email: student.email,
      phone: student.phone,
    });
  };

  const updateStudent = () => {
    api
      .put(`/students/${editingId}`, newStudent)
      .then(() => {
        fetchStudents();

        setEditingId(null);

        setNewStudent({
          name: "",
          email: "",
          phone: "",
        });

        toast.success("Student Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Update Student");
      });
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Delete this student?")) {
      return;
    }

    api
      .delete(`/students/${id}`)
      .then(() => {
        fetchStudents();
        toast.success("Student Deleted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to Delete Student");
      });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.phone.includes(search)
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-6">
            Student Management
          </h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">

                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>

                <p className="text-gray-600 text-lg">
                  Loading Students...
                </p>

              </div>
            </div>
          ) : (
            <>
              {/* Add / Edit Student */}

              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

                <h2 className="text-xl font-bold mb-4">
                  {editingId ? "Edit Student" : "Add Student"}
                </h2>

                <div className="grid grid-cols-3 gap-4">

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newStudent.email}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newStudent.phone}
                    onChange={handleChange}
                    className="border p-3 rounded"
                  />

                </div>

                {editingId ? (
                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={updateStudent}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                    >
                      Update Student
                    </button>

                    <button
                      onClick={() => {
                        setEditingId(null);

                        setNewStudent({
                          name: "",
                          email: "",
                          phone: "",
                        });
                      }}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>

                  </div>
                ) : (
                  <button
                    onClick={addStudent}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Add Student
                  </button>
                )}

              </div>

              {/* Search */}

              <div className="mb-6">

                <input
                  type="text"
                  placeholder="Search Student..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              {/* Students Table */}

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                  <thead className="bg-blue-600 text-white">

                    <tr>
                      <th className="p-4">ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (

                        <tr
                          key={student.id}
                          className="border-b hover:bg-gray-100"
                        >

                          <td className="p-4">
                            {student.id}
                          </td>

                          <td>
                            {student.name}
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            {student.phone}
                          </td>

                          <td>

                            <button
                              onClick={() => editStudent(student)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteStudent(student.id)}
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
                          colSpan="5"
                          className="text-center p-8 text-gray-500"
                        >
                          No students found
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

export default Students;