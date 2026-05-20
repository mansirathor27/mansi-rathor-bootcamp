import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gray-700 text-gray-100 px-8 py-4 flex justify-between items-center shadow-md border-b-2 border-gray-600">
      <Link to="/dashboard" className="text-2xl font-bold hover:text-white transition-colors">
        📊 EMS
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/employees" className="text-gray-100 hover:text-white transition-colors font-medium">
          Employees
        </Link>
        <Link to="/departments" className="text-gray-100 hover:text-white transition-colors font-medium">
          Departments
        </Link>
        <button
          onClick={logout}
          className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;