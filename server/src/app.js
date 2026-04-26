const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Job Application Tracker API is running",
    data: null,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
