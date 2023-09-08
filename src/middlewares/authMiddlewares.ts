import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    authData?: {
      id?: string;
      iat?: any;
    };
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (!token) res.status(401).send();

  try {
    const verified = jwt.verify(
      token as string,
      process.env.SECRET_WORD as string
    );
    // console.log("verified: ", verified);
    req.authData = verified as { id?: string; iat?: any };
    next();
  } catch (error) {
    console.log("error: ", error);
    res.status(401).send();
  }
};
