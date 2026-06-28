require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const messRoutes = require("./routes/messRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection error:", err));

app.use("/messes", messRoutes);

// Optional health check
app.get("/", (req, res) => {
  res.send("MessMate API is running");
});
