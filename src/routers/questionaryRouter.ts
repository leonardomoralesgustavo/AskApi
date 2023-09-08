import { Router } from "express";
import { verifyToken } from "../middlewares";
import {
  createQuestionary,
  getQuestionaryData,
  retrieveAllQuestionaries,
} from "../services";

const questionaryRouter = Router();

questionaryRouter.use(verifyToken);
questionaryRouter.get("/:id", getQuestionaryData);
questionaryRouter.get("", retrieveAllQuestionaries);
questionaryRouter.post("", createQuestionary);

export { questionaryRouter };
