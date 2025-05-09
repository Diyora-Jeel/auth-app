import prisma from "@/dbConfig/dbConfig.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async (email, emailType, userId) => {
  try {
    
    const hashedToken = uuidv4();

    const verifyEmailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Verify Your Email</h2>
    
    <p style="font-size: 16px; color: #555;">
      Thank you for signing up! Please confirm your email address by clicking the button below:
    </p>

    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
       style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">
      Verify Email
    </a>

    <p style="font-size: 14px; color: #777;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="font-size: 14px; color: #0070f3; word-break: break-all;">
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>

    <p style="font-size: 12px; color: #aaa; margin-top: 40px;">
      If you didn’t request this, please ignore this email.
    </p>
  </div>
`;

    const resetPasswordHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Reset Your Password</h2>
    
    <p style="font-size: 16px; color: #555;">
      You recently requested to reset your password. Click the button below to proceed:
    </p>

    <a href="${process.env.DOMAIN}/forgotpassword?token=${hashedToken}" 
       style="display: inline-block; margin: 20px 0; padding: 12px 20px; background-color: #dc3545; color: #fff; text-decoration: none; border-radius: 5px;">
      Reset Password
    </a>

    <p style="font-size: 14px; color: #777;">
      If the button doesn't work, copy and paste this link into your browser:
    </p>

    <p style="font-size: 14px; color: #0070f3; word-break: break-all;">
      ${process.env.DOMAIN}/forgotpassword?token=${hashedToken}
    </p>

    <p style="font-size: 12px; color: #aaa; margin-top: 40px;">
      If you didn’t request a password reset, you can safely ignore this email.
    </p>
  </div>
`;
    const timestamp = Date.now() + 3600000;
    const datatime = new Date(timestamp).toISOString();

    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          verify_token: hashedToken,
          verify_token_expiry: datatime,
        },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          forgot_password_token: hashedToken,
          forgot_password_token_expiry: datatime,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "ee73004e556cd0cf848b3ec05904b3e8",
      },
    });

    const mailOption = {
      from: "smtp@mailtrap.io",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" ? verifyEmailHtml : resetPasswordHtml,
    };

    const mailRespons = await transport.sendMail(mailOption);

    return mailRespons;
  } catch (error) {
    throw new Error(error.message);
  }
};
