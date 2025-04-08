import nodemailer from 'nodemailer'
import { EMAIL, PASS } from '../utlis/config.js';

const sendResetEmail = async (userEmail, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or use Mailtrap, Outlook, etc.
            auth: {
                user: EMAIL, // your Gmail
                pass: PASS, // your Gmail app password
            },
        });

        const resetLink = `https://gptv.netlify.app/reset-password/${resetToken}`;

        const mailOptions = {
            from: '"GP Vanavasi" <no-reply@gpvanavasi.com>',
            to: userEmail,
            subject: 'Password Reset Request',
            html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; padding: 40px; color: #111827;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
    <h2 style="color: #4f46e5; font-size: 24px; margin-bottom: 16px;">Hello 👋</h2>
    
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      You recently requested to reset your password for your GP Vanavasi account. Click the button below to reset it:
    </p>

    <a href="${resetLink}" 
       style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
      Reset Password
    </a>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 32px; color: #6b7280;">
      If you didn’t request this, you can safely ignore this email. Only a person with access to your email can reset your password.
    </p>

    <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />

    <p style="font-size: 14px; color: #9ca3af;">– GP Vanavasi Team</p>
  </div>

  <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 24px;">
    &copy; ${new Date().getFullYear()} GP Vanavasi. All rights reserved.
  </p>
</div>

      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Reset email sent to ${userEmail}`);
    } catch (error) {
        console.error('❌ Error sending reset email:', error);
        throw new Error('Failed to send reset email');
    }
};

export default sendResetEmail
