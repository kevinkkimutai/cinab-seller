// /home/bea/projects/e-procurement/servers/middleware/Verification.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "onlinecinab@gmail.com",
    pass: "gguoalwewnoqzcql",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmails = async ({to, subject, verificationLink, username}) => {

  try {
    // Read the email template file
    const emailTemplatePath = path.join(
      __dirname,
      "verification-email-template.html"
    ); // Replace placeholders in the template with actual values
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    const emailContent = emailTemplate
      .replace("{verificationLink}", verificationLink)
      .replace("{name}", username);

    // Send the email
    const mailOptions = {
      from: "onlinecinab@gmail.com",
      to: to,
      subject: subject,
      html: emailContent,
    };

    const info = await smtpTransport.sendMail(mailOptions);

  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    smtpTransport.close();
  }
};

module.exports = {
  sendEmails,
};
