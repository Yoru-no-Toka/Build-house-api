import express from "express";
import multer from "multer";
import fs from "fs";
import nodemailer from "nodemailer";
import db from "../db.js";

const SECRET_KEY = process.env.SECRET_KEY;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

const router = express.Router();

const upload = multer({
  dest: "uploads/pdf",
});

router.post("/create-data", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.filename;
    const newObject = new db.ObjectModel({
      image,
      title,
      description,
    });
    await newObject.save();
    res.status(201).json({
      message: "Object succesfully created",
    });
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({
      error,
    });
  }
});

router.post("/reqs/file", async (req, res) => {
  try {
    const { tel, text } = req.body;
    const { originalname, buffer, mimetype } = req.file;
    const request = new db.requestFormFileModel({
      tel,
      text,
      file: {
        name: originalname,
        data: buffer,
        contentType: mimetype,
      },
    });

    const sourcePath = req.file.path;

    const targetPath = path.join(__dirname, "uploads", req.file.originalname);

    const transporter = nodemailer.createTransport({
      service: "abc",
      auth: {
        user: MAIL_USERNAME,
        path: MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: MAIL_USERNAME,
      to: "abc@yandex.ru",
      subject: req.file,
      text,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Заявка отправлена");
      }
    });

    fs.copyFile(sourcePath, targetPath, (error) => {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Заявка успешно сохранена в /uploads");
      }
    });
    await request.save();
    res.status(200).json({
      text: "Заявка успешно обработана и сохранена",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({
      error: "Проблема в работе сервера",
    });
  }
});

router.post("/reqs", async (req, res) => {
  try {
    const { name, tel, text } = req.body;
    if (name.lenght <= 3 || name.lenght >= 12) {
      res.status(406).json({
        error: "Длина имени должна быть от 3, но не более 12 символов",
      });
    }
    const request = new db.requestFormModel({
      name,
      tel,
      text,
    });

    console.log({
      name,
      tel,
      text,
    });

    await request.save();
    res.status(200).json({
      text: "Заявка успешно обработана и сохранена",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({
      error: "Проблема в работе сервера",
    });
  }
});

router.post("/reqs/date", async (req, res) => {
  try {
    const { name, tel, date, time, text } = req.body;
    const request = new db.requestFormDateModel({
      name,
      tel,
      date,
      time,
      text,
    });
    await request.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const { buildingTime, budget, designTime, square } = req.body;
    const project = new db.ProjectInfoModel({
      buildingTime,
      budget,
      designTime,
      square,
    });
    await project.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default router;
