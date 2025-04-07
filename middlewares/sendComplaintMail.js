import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EMAIL, PASS } from "../utlis/config.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

export const sendComplaintMail = async (
  name = "Anonymous",
  department,
  incident,
  email
) => {
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">🛑 Anti-Ragging Complaint Notification</h2>
      <p><strong style="color: #374151;">Name:</strong> ${name}</p>
      <p><strong style="color: #374151;">Department:</strong> ${department}</p>
      <div style="margin-top: 15px;">
        <p style="margin-bottom: 5px;"><strong style="color: #374151;">Incident Details:</strong></p>
        <div style="background-color: #fff3f3; padding: 15px; border-left: 5px solid #dc2626; color: #1f2937; border-radius: 5px;">
          ${incident}
        </div>
      </div>
      <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">This message was generated from the Anti-Ragging Complaint Portal at Government Polytechnic College, Vanavasi.</p>
    </div>
  `;

  const mailOptions = {
    from: `"Complaint Portal" <${EMAIL}>`,
    to: email,
    subject: "🛡️ New Anti-Ragging Complaint Received",
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", email);
    return result;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};
