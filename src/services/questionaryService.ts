import { Request, Response } from "express";
import { IQuestionary } from "../interfaces";
import { DaoQuestionary } from "../models";

export const retrieveAllQuestionaries = async (req: Request, res: Response) => {
  try {
    const resultQuests = await DaoQuestionary.find()
      .select("_id name description")
      .exec();

    const finalRes = resultQuests.map((ele) => {
      const aux = {
        id: ele["_id"].toString(),
        name: ele.name,
        description: ele.description,
      };
      return aux;
    });
    res.json({ questionaries: finalRes });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getQuestionaryData = async (
  req: Request<{ id: string }, {}, {}, { page: number; limit: number }>,
  res: Response
) => {
  const { id } = req.params;
  const { limit, page } = req.query;
  console.log(req.query);
  try {
    const resultQuests = await DaoQuestionary.findById(id)
      .select("questions answers -_id")
      .exec();
    console.log({ resultQuests });
    res.json({
      questionaryData: {
        answers: resultQuests?.answers,
        questions: resultQuests?.questions.slice(
          (page - 1) * limit,
          limit * page
        ),
      },
      currentPage: page,
      totalPages: Math.ceil(resultQuests!.questions.length / limit),
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const createQuestionary = async (
  req: Request<{}, {}, IQuestionary>,
  res: Response
) => {
  try {
    const result = await DaoQuestionary.create({ ...req.body });
    res.json({ result });
  } catch (error) {
    console.log("error: ", error);
  }
};
