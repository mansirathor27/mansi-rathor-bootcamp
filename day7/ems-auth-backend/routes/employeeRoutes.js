import express from "express";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Validation helper
const validateEmployee = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === "") errors.push("Name is required");
  if (!data.email || data.email.trim() === "") errors.push("Email is required");
  if (!/\S+@\S+\.\S+/.test(data.email)) errors.push("Email format is invalid");
  if (!data.phone || data.phone.trim() === "") errors.push("Phone is required");
  if (!data.department) errors.push("Department is required");
  if (!data.designation || data.designation.trim() === "") errors.push("Designation is required");
  if (!data.salary || data.salary <= 0) errors.push("Valid salary is required");
  if (!data.joinDate) errors.push("Join date is required");

  return errors;
};

// CREATE employee
router.post("/", auth, async (req, res) => {
  try {
    const errors = validateEmployee(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Verify department exists
    const department = await Department.findById(req.body.department);
    if (!department) {
      return res.status(400).json({ msg: "Department not found" });
    }

    const employee = new Employee(req.body);
    await employee.save();
    
    const populatedEmployee = await employee.populate("department", "name");
    res.status(201).json(populatedEmployee);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});


// GET all employees with populated department
router.get("/", auth, async (req, res) => {
  try {
    const employees = await Employee.find().populate("department", "name");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single employee by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("department");

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE employee
router.put("/:id", auth, async (req, res) => {
  try {
    const errors = validateEmployee(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Verify department exists if being updated
    if (req.body.department) {
      const department = await Department.findById(req.body.department);
      if (!department) {
        return res.status(400).json({ msg: "Department not found" });
      }
    }

    // Check if email is being changed to existing email
    if (req.body.email) {
      const existingEmployee = await Employee.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id }
      });
      if (existingEmployee) {
        return res.status(400).json({ msg: "Email already exists" });
      }
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("department", "name");

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE employee
router.delete("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;