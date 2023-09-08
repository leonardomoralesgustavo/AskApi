import { Router } from "express";
import { verifyToken } from "../middlewares";
import { createUser, getAnsweredQuestionaries, setSelectedQuestionary, verifySessionToken } from "../services";

const userRouter = Router();

userRouter.post("", createUser);

userRouter.use(verifyToken);
userRouter.get("/session", verifySessionToken);
userRouter.get("/selectQuestionary", getAnsweredQuestionaries);
userRouter.post("/selectQuestionary", setSelectedQuestionary);

export { userRouter };
