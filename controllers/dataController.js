import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const cards = await db.ObjectModel.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("error fetching cards", error);
    res.status(500).json({
      error,
    });
  }
});

export default router;
