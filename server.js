import express from "express";
import dataRoutes from "./controllers/dataController.js";
import requestRoutes from "./controllers/requestController.js";
import db from "./db.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static("public"));

app.use(dataRoutes);

app.use(requestRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
