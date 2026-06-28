const express = require("express");
const router = express.Router();
const Mess = require("../models/Mess");

// GET all messes
router.get("/", async (req, res) => {
  try {
    const messes = await Mess.find();
    res.json(messes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single mess by ID
router.get("/:id", async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });
    res.json(mess);
  } catch (err) {
    res.status(500).json({ message: "Invalid ID or server error" });
  }
});

// POST create a mess
router.post("/", async (req, res) => {
  try {
    const { name, location, price } = req.body;
    const mess = new Mess({ name, location, price });
    const saved = await mess.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Bad request or missing fields" });
  }
});

// PUT update a mess
router.put("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!mess) return res.status(404).json({ message: "Mess not found" });
    res.json(mess);
  } catch (err) {
    res.status(400).json({ message: "Invalid input or ID" });
  }
});

// DELETE a mess
router.delete("/:id", async (req, res) => {
  try {
    const mess = await Mess.findByIdAndDelete(req.params.id);
    if (!mess) return res.status(404).json({ message: "Mess not found" });
    res.json({ message: "Mess deleted", mess });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID or server error" });
  }
});

module.exports = router;
