import { useState, useEffect } from "react";
import {
  FiAlertCircle,
  FiBriefcase,
  FiFileText,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";

function DepartmentForm({
  onSubmit,
  selectedDepartment,
  error,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    head: "",
    budget: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (selectedDepartment) {
      setForm({
        name: selectedDepartment.name || "",
        description:
          selectedDepartment.description || "",
        head: selectedDepartment.head || "",
        budget: selectedDepartment.budget || "",
      });

      setFormErrors({});
    }
  }, [selectedDepartment]);

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

    if (!form.name.trim()) {
      errors.name = "Department name is required";
    }

    if (!form.head.trim()) {
      errors.head = "Department head is required";
    }

    if (!form.budget) {
      errors.budget = "Budget is required";
    } else if (form.budget <= 0) {
      errors.budget = "Budget must be positive";
    }

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
        : "border-gray-300 focus:ring-green-500"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Backend Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <FiAlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Department Details */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Department Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Department Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department Name *
            </label>

            <div className="relative">
              <FiBriefcase
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="name"
                placeholder="e.g. Human Resources"
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

          {/* Department Head */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department Head *
            </label>

            <div className="relative">
              <FiUser
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="text"
                name="head"
                placeholder="Head of Department"
                value={form.head}
                onChange={handleChange}
                className={inputClass("head")}
              />
            </div>

            {formErrors.head && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.head}
              </p>
            )}
          </div>

          {/* Budget */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department Budget *
            </label>

            <div className="relative">
              <FiDollarSign
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />

              <input
                type="number"
                name="budget"
                placeholder="Enter annual budget"
                value={form.budget}
                onChange={handleChange}
                className={inputClass("budget")}
              />
            </div>

            {formErrors.budget && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.budget}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description
        </label>

        <div className="relative">
          <FiFileText
            className="absolute left-4 top-4 text-gray-400"
            size={18}
          />

          <textarea
            name="description"
            rows="4"
            placeholder="Enter department description..."
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 pl-11 pr-4 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-lg"
      >
        {selectedDepartment
          ? "Update Department"
          : "Add Department"}
      </button>
    </form>
  );
}

export default DepartmentForm;