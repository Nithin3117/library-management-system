import {
  FaBook,
  FaBookOpen,
  FaBookReader,
  FaUserGraduate,
} from "react-icons/fa";

function DashboardCard({ title, value, color }) {
  const getIcon = () => {
    if (title === "Total Books") {
      return <FaBook />;
    }

    if (title === "Available Books") {
      return <FaBookOpen />;
    }

    if (title === "Issued Books") {
      return <FaBookReader />;
    }

    if (title === "Students") {
      return <FaUserGraduate />;
    }

    return <FaBook />;
  };

  return (
    <div
      className={`${color} rounded-xl shadow-lg p-6 text-white
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300`}
    >

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-medium">
            {title}
          </h2>

          <p className="text-4xl font-bold mt-3">
            {value}
          </p>

        </div>

        <div className="text-4xl opacity-80">
          {getIcon()}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;