import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: Date, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);