const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));


app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "GET request successful" });
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  res.json({
    message: "POST received",
    data
  });
});

app.get("/api/error", (req, res, next) => {
  const err = new Error("This is a test error");
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});