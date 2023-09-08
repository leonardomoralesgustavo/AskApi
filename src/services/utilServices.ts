import { Request, Response } from "express";
import emailValidator from "deep-email-validator";
import twilio from "twilio";

export const verifyEmail = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  const { email } = req.body;
  try {
    const response = await emailValidator(email);
    res.json({ valid: response.valid });
  } catch (error) {
    res.status(400).json({ error });
    console.log("error: ", error);
  }
};

export const verifyPhoneNumber = async (
  req: Request<{}, {}, { phone: string }>,
  res: Response
) => {
  const { phone } = req.body;
  try {
    // console.log({
    //   sid: process.env.TWILIO_SID as string,
    //   token: process.env.TWILIO_TOKEN,
    //   service: process.env.TWILIO_SERVICE_SID,
    // });

    const twilioClient = twilio(
      process.env.TWILIO_SID as string,
      process.env.TWILIO_TOKEN as string,
      {
        lazyLoading: false,
      }
    );
    const response = await twilioClient.verify.v2
      .services(process.env.TWILIO_SERVICE_SID as string)
      .verifications.create({ to: phone, channel: "sms" });
    res.json({ status: response.status });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};

export const verifyPhoneNumberCode = async (
  req: Request<{}, {}, { code: string; phone: string }>,
  res: Response
) => {
  const { code, phone } = req.body;
  try {
    const twilioClient = twilio(
      process.env.TWILIO_SID as string,
      process.env.TWILIO_TOKEN as string,
      {
        lazyLoading: false,
      }
    );
    const response = await twilioClient.verify.v2
      .services(process.env.TWILIO_SERVICE_SID as string)
      .verificationChecks.create({ to: phone, code: code });
    res.json({ status: response.status, valid: response.valid });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error });
  }
};
