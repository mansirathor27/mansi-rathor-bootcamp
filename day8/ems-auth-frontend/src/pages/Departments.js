import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeForm from "../components/EmployeeForm";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await API.get("/employees");
      setEmployees(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      setError("Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const addEmployee = async (data) => {
    try {
      await API.post("/employees", data);
      fetchEmployees();
      setShowModal(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || err.response?.data?.msg || "Error adding employee");
    }
  };

  const updateEmployee = async (data) => {
    try {
      await API.put(`/employees/${selectedEmployee._id}`, data);
      fetchEmployees();
      setShowModal(false);
      setSelectedEmployee(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.errors?.[0] || err.response?.data?.msg || "Error updating employee");
    }
  };

  const deleteEmployee = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
      setError("");
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee Management</h1>
            <p className="text-gray-600">Manage your organization's workforce</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Search and Add Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setShowModal(true);
                setSelectedEmployee(null);
                setError("");
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold flex items-center gap-2 shadow-md transition-all"
            >
              <FiPlus size={20} /> Add Employee
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">Loading employees...</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500">No employees found</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Phone</th>
                    <th className="p-4 text-left font-semibold">Department</th>
                    <th className="p-4 text-left font-semibold">Designation</th>
                    <th className="p-4 text-left font-semibold">Salary</th>
                    <th className="p-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEmployees.map((emp, idx) => (
                    <tr key={emp._id} className={`border-b hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="p-4 font-medium text-gray-800">{emp.name}</td>
                      <td className="p-4 text-gray-600">{emp.email}</td>
                      <td className="p-4 text-gray-600">{emp.phone}</td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {emp.department?.name || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{emp.designation}</td>
                      <td className="p-4 font-semibold text-green-600">₹ {emp.salary.toLocaleString()}</td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedEmployee(emp);
                              setShowModal(true);
                              setError("");
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
                            title="Edit"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          <button
                            onClick={() => deleteEmployee(emp._id, emp.name)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">Total Departments</p>
              <p className="text-3xl font-bold text-green-600">{departments.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600">Showing Results</p>
              <p className="text-3xl font-bold text-purple-600">{filteredEmployees.length}</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <EmployeeModal
          title={selectedEmployee ? "Edit Employee" : "Add Employee"}
          closeModal={() => {
            setShowModal(false);
            setError("");
          }}
        >
          <EmployeeForm
            departments={departments}
            selectedEmployee={selectedEmployee}
            onSubmit={
              selectedEmployee
                ? updateEmployee
                : addEmployee
            }
            error={error}
          />
        </EmployeeModal>
      )}
    </>
  );
}

export default Employees;