import { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

function EmployeeForm({
  onSubmit,
  departments,
  selectedEmployee,
  error,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joinDate: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        ...selectedEmployee,
        department: selectedEmployee.department?._id || "",
        joinDate: selectedEmployee.joinDate
          ? new Date(selectedEmployee.joinDate)
              .toISOString()
              .split("T")[0]
          : "",
      });

      setFormErrors({});
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Name is required";

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      errors.phone = "Phone must be 10 digits";
    }

    if (!form.department)
      errors.department = "Department is required";

    if (!form.designation.trim())
      errors.designation = "Designation is required";

    if (!form.salary) {
      errors.salary = "Salary is required";
    } else if (form.salary <= 0) {
      errors.salary = "Salary must be positive";
    }

    if (!form.joinDate)
      errors.joinDate = "Join date is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmit(form);
  };

  const inputClass = (field) =>
    `w-full border pl-11 pr-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
      formErrors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <FiAlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>

            <div className="relative">
              <FiUser
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                className={inputClass("name")}
              />
            </div>

            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>

            <div className="relative">
              <FiMail
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
            </div>

            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>

            <div className="relative">
              <FiPhone
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="phone"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                className={inputClass("phone")}
              />
            </div>

            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department *
            </label>

            <div className="relative">
              <FiBriefcase
                className="absolute left-4 top-4 text-gray-400 z-10"
                size={18}
              />

              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={`${inputClass(
                  "department"
                )} appearance-none`}
              >
                <option value="">
                  -- Select Department --
                </option>

                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {formErrors.department && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.department}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Job Information */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Job Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Designation *
            </label>

            <div className="relative">
              <FiBriefcase
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="designation"
                placeholder="e.g. Software Engineer"
                value={form.designation}
                onChange={handleChange}
                className={inputClass("designation")}
              />
            </div>

            {formErrors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.designation}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Salary *
            </label>

            <div className="relative">
              <FiDollarSign
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={form.salary}
                onChange={handleChange}
                className={inputClass("salary")}
              />
            </div>

            {formErrors.salary && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.salary}
              </p>
            )}
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Join Date *
            </label>

            <div className="relative">
              <FiCalendar
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="date"
                name="joinDate"
                value={form.joinDate}
                onChange={handleChange}
                className={inputClass("joinDate")}
              />
            </div>

            {formErrors.joinDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.joinDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Address
        </label>

        <div className="relative">
          <FiMapPin
            className="absolute left-4 top-4 text-gray-400"
            size={18}
          />

          <textarea
            name="address"
            rows="3"
            placeholder="Enter full address..."
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg"
      >
        {selectedEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>
    </form>
  );
}

export default EmployeeForm;