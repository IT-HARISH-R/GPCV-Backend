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
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f0f2f5;
                padding: 20px;
                margin: 0;
              }
              .email-container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                background-color: #4f46e5;
                color: #ffffff;
                padding: 16px 0;
                border-radius: 10px 10px 0 0;
              }
              .header h2 {
                margin: 0;
              }
              .content {
                padding: 25px 20px;
                color: #333333;
                line-height: 1.6;
              }
              .credentials {
                background-color: #f8f9fa;
                padding: 15px;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                margin: 20px 0;
              }
              .credentials p {
                margin: 6px 0;
                font-weight: 500;
              }
              .button {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 24px;
                background-color: #4f46e5;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
                transition: background-color 0.3s ease;
              }
              .button:hover {
                background-color: #3730a3;
              }
              .footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                margin-top: 30px;
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
                <p>We're thrilled to welcome you to Government Polytechnic College, Vanavasi!</p>
                <p>Here are your login credentials:</p>
                <div class="credentials">
                  <p>Email: <span>${email}</span></p>
                  <p>Password: <span>${password}</span></p>
                  <p>Role: <span>${role}</span></p>
                </div>
                <p>Click the button below to access your dashboard and get started. Don’t forget to change your password after logging in.</p>
                <a href="http://localhost:5173/login" class="button">Login to Dashboard</a>
                <p style="margin-top: 24px;">If you have any questions or need support, feel free to contact us.</p>
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
