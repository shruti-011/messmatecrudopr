const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");

// ==========================
// GET All Messes (Pagination)
// ==========================
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const messes = await Mess.find().skip(skip).limit(limit);

    res.json(messes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// Search by Location
// ==========================
router.get("/search", async (req, res) => {
  try {
    const messes = await Mess.find({
      location: req.query.location,
    });

    res.json(messes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==========================
// GET Single Mess
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    res.json(mess);
  } catch (err) {
    res.status(500).json({
      message: "Invalid ID or server error",
    });
  }
});

// ==========================
// Create Mess
// ==========================
router.post("/", async (req, res) => {
  try {
    const { name, location, price, rating } = req.body;

    const mess = new Mess({
      name,
      location,
      price,
      rating,
    });

    const saved = await mess.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: "Bad request or missing fields",
    });
  }
});

// ==========================
// Update Mess
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    res.json(mess);
  } catch (err) {
    res.status(400).json({
      message: "Invalid input or ID",
    });
  }
});

// ==========================
// Delete Mess
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByIdAndDelete(req.params.id);

    if (!mess) {
      return res.status(404).json({
        message: "Mess not found",
      });
    }

    res.json({
      message: "Mess deleted successfully",
      mess,
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid ID or server error",
    });
  }
});

module.exports = router;
