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
      <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">✅ Complaint Registered Successfully</h2>
      <p>Hello <strong style="color: #1f2937;">${name}</strong>,</p>
      <p style="color: #374151;">Your anti-ragging complaint has been successfully registered. Please do not worry — the concerned authorities have been notified and will take immediate action.</p>
      
      <div style="margin-top: 20px;">
        <p><strong style="color: #374151;">🧑‍🎓 Department:</strong> ${department}</p>
        <p><strong style="color: #374151;">📝 Incident Details:</strong></p>
        <div style="background-color: #fff3f3; padding: 15px; border-left: 5px solid #dc2626; color: #1f2937; border-radius: 5px;">
          ${incident}
        </div>
      </div>

      <p style="margin-top: 20px; color: #4b5563;">We appreciate your courage in raising your voice. Your safety is our priority.</p>

      <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">This confirmation was sent from the Anti-Ragging Complaint Portal at Government Polytechnic College, Vanavasi.</p>
    </div>
  `;

  const mailOptions = {
    from: `"Complaint Portal" <${EMAIL}>`,
    to: email,
    subject: "✅ Your Complaint Has Been Registered Successfully",
    html: htmlContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Confirmation email sent to", email);
    return result;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};
