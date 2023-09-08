import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    questionaries: {
      type: [
        new Schema({
          questionaryId: String,
          responses: {
            type: [
              new Schema({
                questionId: String,
                value: Number,
              }),
            ],
          },
        }),
      ],
    },
  },
  { versionKey: false }
);

export const DaoUser = mongoose.model("User", UserSchema);
