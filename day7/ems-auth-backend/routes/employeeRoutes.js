import express from "express";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();



router.post("/", auth, async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ msg: "Validation error" });
  }
});

router.get("/", auth, async (req, res) => {
  const employees = await Employee.find().populate("department", "name");
  res.json(employees);
});


router.get("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("department", "name");

    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.put("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) return res.status(404).json({ msg: "Employee not found" });

    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;