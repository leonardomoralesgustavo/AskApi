import { Router } from "express";
import { verifyEmail, verifyPhoneNumber, verifyPhoneNumberCode } from "../services/utilServices";


const utilRouter = Router();

utilRouter.post("/verifyEmail", verifyEmail);
utilRouter.post("/verifyPhone", verifyPhoneNumber);
utilRouter.post("/verifyPhoneCode", verifyPhoneNumberCode);

export { utilRouter };
