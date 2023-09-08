import { Request, Response } from "express";
import { signToken } from "../helpers";
import { IAnsweredQuestionary } from "../interfaces";
import { DaoUser } from "../models";

export const createUser = async (
  req: Request<{}, {}, { name: string; email: string, phone: string }>,
  res: Response
) => {
  const { email, name, phone } = req.body;
  try {
    const userExist = await DaoUser.findOne().where({ email }).exec();
    if (userExist) {
      const token = signToken(userExist["_id"].toString());
      return res.status(200).json({ name: userExist.name, token });
    }
    const createdUser = await DaoUser.create({ email, name, phone });
    const token = signToken(createdUser["_id"].toString());
    res.status(201).json({ name: createdUser.name, token });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const verifySessionToken = async (req: Request, res: Response) => {
  try {
    const user = await DaoUser.findById(req.authData?.id).select(
      "name email -_id"
    );
    if (user) return res.json(user);
  } catch (error) {
    console.log("error", error);
    res.json({ error });
  }
};

export const setSelectedQuestionary = async (
  req: Request<{}, {}, IAnsweredQuestionary>,
  res: Response
) => {
  const { questionaryId, responses } = req.body;
  console.log({ questionaryId, responses });
  try {
    const user = await DaoUser.findById(req.authData?.id);
    console.log("user in set questionary endpoint: \n", user);
    if (!user) return res.status(404).send();

    const index = user.questionaries.findIndex(
      (quest) => quest.questionaryId === questionaryId
    );

    if (index < 0) user.questionaries.push({ questionaryId, responses });
    else user.questionaries[index].responses = responses;
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error });
  }
};

export const getAnsweredQuestionaries = async (req: Request, res: Response) => {
  try {
    const user = await DaoUser.findById(req.authData?.id)
      .select("questionaries -_id")
      .exec();
    if (!user) return res.status(404).send();
    if (user.questionaries.length < 1)
      return res.status(403).json({ questionaryId: "", responses: [] });
    res.json({
      questionaryId: user.questionaries[0].questionaryId,
      responses: user.questionaries[0].responses,
    });
  } catch (error) {
    console.log("error: ", error);
    res.json({ error });
  }
};
