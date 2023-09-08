import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { exit } from "process";
import { questionaryRouter, userRouter } from "./src/routers";
import { utilRouter } from "./src/routers/utilsRouter";

dotenv.config();

const PORT = process.env.PORT;
const URL_CONNECTION = process.env.DB_CONNECTION_URL as string;

const app = express();

app.use(express.json());
app.use(cors());

// app.use(verifyToken)
app.use("/user", userRouter);
app.use("/questionary", questionaryRouter);
app.use("/utils", utilRouter);

const startServer = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URL_CONNECTION);
    app.listen(PORT, () => {
      console.log("[SERVER]: server is running on port: " + PORT);
    });
  } catch (error) {
    console.log("error: ", error);
    exit(1);
  }
};

startServer();
