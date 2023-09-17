import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const cards = await db.ObjectModel.find()
      .sort({
        completeDate: -1,
      })
      .exec((error, resoults) => {
        if (error) {
          throw new Error(error);
        } else {
          res.status(200).json(cards);
        }
      });
  } catch (error) {
    console.error("error fetching cards", error);
    res.status(500).json({
      error,
    });
  }
});

router.get("/data/completed", async (req, res) => {
  try {
    const cards = await db.ObjectModel.find();
    const cardsArray = Array.from(cards);
    res.status(200).json(cardsArray.filter((card) => card.status));
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/data/incompleted", async (req, res) => {
  try {
    const cards = await db.ObjectModel.find();
    const cardsArray = Array.from(cards);
    res.status(200).json(cardsArray.filter((card) => !card.status));
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const cards = await db.reviewModel.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/project", async (req, res) => {
  try {
    const projects = await db.ProjectInfoModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default router;
