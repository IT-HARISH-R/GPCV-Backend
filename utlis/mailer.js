import nodemailer from "nodemailer";
import { EMAIL, PASS } from "./config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});
