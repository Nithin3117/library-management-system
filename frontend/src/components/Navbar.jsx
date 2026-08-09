import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-lg px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-700">
        Library Management System
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;