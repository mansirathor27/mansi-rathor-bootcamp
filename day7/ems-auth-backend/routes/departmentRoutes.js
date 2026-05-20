import express from "express";
import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE department
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ msg: "Department name is required" });
    }

    // Check if department with same name already exists
    const existingDept = await Department.findOne({ 
      name: { $regex: req.body.name, $options: "i" } 
    });
    if (existingDept) {
      return res.status(400).json({ msg: "Department already exists" });
    }

    const department = new Department({
      name: req.body.name.trim(),
    });

    await department.save();
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

// GET all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single department
router.get("/:id", auth, async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.json(department);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE department
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.body.name || req.body.name.trim() === "") {
      return res.status(400).json({ msg: "Department name is required" });
    }

    // Check if another department with same name already exists
    const existingDept = await Department.findOne({
      name: { $regex: req.body.name, $options: "i" },
      _id: { $ne: req.params.id }
    });
    if (existingDept) {
      return res.status(400).json({ msg: "Department name already exists" });
    }

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name.trim() },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.json(department);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE department
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if any employees are assigned to this department
    const employeeCount = await Employee.countDocuments({
      department: req.params.id
    });

    if (employeeCount > 0) {
      return res.status(400).json({
        msg: `Cannot delete department. ${employeeCount} employee(s) are assigned to this department.`
      });
    }

    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.json({ msg: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

