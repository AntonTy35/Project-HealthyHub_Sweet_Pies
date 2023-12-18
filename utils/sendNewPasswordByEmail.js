require("dotenv").config();

const nodemailer = require("nodemailer");

const sendNewPasswordByEmail = async (email, newPassword) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const emailOptions = {
      from: "alex_akvalang@ukr.net",
      to: email,
      subject: "New password",
      html: `<b>Your new password is: ${newPassword}`,
      text: `<b><p>Your new password is: ${newPassword}</p> `,
    };
    await transport.sendMail(emailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
module.exports = sendNewPasswordByEmail;
