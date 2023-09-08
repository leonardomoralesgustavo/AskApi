import mongoose, { Schema } from "mongoose";
import { IQuestionary } from "../interfaces";

const QuestionarySchema = new Schema<IQuestionary>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: [new Schema({ id: { type: String }, text: String })],
      required: true,
    },
    answers: {
      type: [new Schema({ value: Number, text: String })],
      required: true,
    },
  },
  { versionKey: false }
);

export const DaoQuestionary = mongoose.model("Questionary", QuestionarySchema);
