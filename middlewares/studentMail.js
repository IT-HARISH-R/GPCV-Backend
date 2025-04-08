import nodemailer from "nodemailer";
import { EMAIL, PASS } from "../utlis/config.js";

const studentMail = async ({ name, email, password, role = "student" }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #2c3e50;">Hi ${name},</h2>
        <p>🎉 <strong>Congratulations!</strong></p>
        <p>Welcome to <strong>Government Polytechnic College</strong>. Your <strong>${role}</strong> account has been successfully created.</p>

        <p>Here are your login credentials to access the college student portal:</p>

        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <p><strong>🆔 User ID:</strong> ${email}</p>
          <p><strong>🔑 Password:</strong> ${password}</p>
        </div>

        <p>Please click the button below to log in and begin your academic journey:</p>

        <a href="http://localhost:5173/login" 
           style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 24px; 
           border-radius: 5px; text-decoration: none; font-weight: bold;">
          🔐 Access Student Portal
        </a>

        <p style="margin-top: 30px;">If you encounter any issues, please contact the college admin support team.</p>

        <p>Wishing you the very best at Government Polytechnic College! 🌟</p>

        <hr style="margin-top: 40px;"/>
        <p style="font-size: 12px; color: #888;">— Government Polytechnic College Staff Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Government Polytechnic College Admin" <${EMAIL}>`,
      to: 'harishmass27.8@gmail.com',
      subject: "🎓 Your Student Account is Ready – Login Info Inside",
      html: htmlTemplate,
    });

    console.log(`✅ Email successfully sent to ${email}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${email}:`, err.message);
  }
};

export default studentMail;










// const studentMail = (name, userId, password) => {
//     return {
//       subject: "🎉 Welcome to Government Polytechnic College | Student Portal Access",
//       html: `
//         <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
//           <h2 style="color: #2c3e50;">Hi ${name},</h2>
//           <p>🎉 <strong>Congratulations!</strong></p>
//           <p>Welcome to <strong>Government Polytechnic College</strong>. Your student account has been successfully created.</p>
  
//           <p>Below are your login credentials to access the college student portal:</p>
  
//           <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 15px 0;">
//             <p><strong>🆔 User ID:</strong> ${userId}</p>
//             <p><strong>🔑 Password:</strong> ${password}</p>
//           </div>
  
//           <p style="margin-top: 20px;">Please click the button below to log in and get started with your academic journey:</p>
  
//           <a href="http://localhost:5173/profile/login" 
//              style="display: inline-block; background-color: #007bff; color: #fff; padding: 12px 24px; 
//              border-radius: 5px; text-decoration: none; font-weight: bold;">
//             🔐 Login to Student Portal
//           </a>
  
//           <p style="margin-top: 30px;">If you have any issues logging in, feel free to contact the college admin support team.</p>
  
//           <p>Best wishes for a successful academic journey at Government Polytechnic College! 🌟</p>
  
//           <hr style="margin-top: 40px;"/>
//           <p style="font-size: 12px; color: #888;">— Government Polytechnic College Staff Team</p>
//         </div>
//       `
//     };
//   };
  
//   export default studentMail;
  