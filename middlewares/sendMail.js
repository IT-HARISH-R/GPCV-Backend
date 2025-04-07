import nodemailer from "nodemailer";
import { EMAIL, PASS } from "../utlis/config.js";
// const { EMAIL, PASS } = require("../utlis/config");
// require("dotenv").config();

const sendWelcomeEmail = async ({ name, email, password, role }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL,
                pass: PASS,
            },
        });

        const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Welcome Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              margin: 0;
            }
            .email-container {
              max-width: 600px;
              margin: auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              background-color: #4f46e5;
              color: #ffffff;
              padding: 10px 0;
              border-radius: 6px 6px 0 0;
            }
            .content {
              padding: 20px;
              color: #333333;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888888;
              margin-top: 30px;
            }
            .credentials {
              background-color: #f9f9f9;
              padding: 15px;
              border: 1px solid #dddddd;
              border-radius: 6px;
              margin-top: 15px;
            }
            .credentials p {
              margin: 8px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>🎉 Welcome to Our Team!</h2>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>We're excited to have you on board as a valued employee.</p>
              <p>Here are your login details:</p>
              <div class="credentials">
                <p>Email: <span>${email}</span></p>
                <p>Password: <span>${password}</span></p>
                <p>Role: <span>${role}</span></p>
              </div>
              <p>Please log in to your dashboard and change your password as soon as possible.</p>
              <p>If you have any questions, feel free to reach out.</p>
              <p>Best Regards,<br />Admin Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Government Polytechnic College, Vanavasi. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

        await transporter.sendMail({
            from: `"Admin Team" <${EMAIL}>`,
            to: email,
            subject: "Welcome to Our Team 🎉",
            html: htmlTemplate,
        });

        console.log("✅ Email sent to", email);
    } catch (err) {
        console.error("❌ Error sending email:", err.message);
    }
};

export default sendWelcomeEmail;
