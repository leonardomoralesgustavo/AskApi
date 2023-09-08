import jwt from "jsonwebtoken";


export const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_WORD as string);
};
