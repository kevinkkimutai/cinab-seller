const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onlinecinab@gmail.com",
    pass: "gguoalwewnoqzcql",
  },
});

const sendEmails = async ({ to, subject, verificationLink, username }) => {
  try {
    const emailTemplatePath = path.join(
      __dirname,
      "verification-email-template.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    const emailContent = emailTemplate
      .replace("{verificationLink}", verificationLink)
      .replace("{name}", username);

    const mailOptions = {
      from: "onlinecinab@gmail.com",
      to: to,
      subject: subject,
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendingEmails = async ({ to, subject, text }) => {
  try {
    // Send the email
    const mailOptions = {
      from: "onlinecinab@gmail.com",
      to: to,
      subject: subject,
      text: text,
    };

    const info = await smtpTransport.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    smtpTransport.close();
  }
};

const sendSecretCode = async ({ email, secretCode, next }) => {
  try {
    const mailOptions = {
      from: "onlinecinab@gmail.com",
      to: email,
      subject: "Congratulations! We invite you to get started on our platform",
      html: `
        <p>Dear Customer,</p>
        <p>Thank you for choosing CinabOnline, the best e-commerce company in the region.</p>
        <p>Please click the link below to get started:</p><a href="${secretCode}">Click here</a>
        <p>If you did not request this, please report it to us at cinabsupport@gmail.com.</p>
        <p>Best regards,<br />CinabOnline</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Mail sent");
      }
      if (next) {
        next(); // Proceed to the next middleware or route handler
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sellerCenter = async ({ email, link, companyName }) => {
  try {
    const mailOptions = {
      from: "onlinecinab@gmail.com",
      to: email,
      subject: "Exciting Updates from CinabOnline",
      html: `
        <p>Dear ${companyName},</p>
        <p>We extend our sincere gratitude for choosing CinabOnline, your go-to e-commerce partner in the region.</p>
        <p>We are thrilled to inform you about some exciting new changes that will enhance your experience on our platform.</p>
        <p>To explore these updates and make the most of our improved features, please click the link below:</p>
        <a href="${link}">Click here to get started</a>
        <p>If you did not initiate this request, kindly report it to us at cinabsupport@gmail.com.</p>
        <p>Thank you for being a valued member of the CinabOnline family. We look forward to serving you better!</p>
        <p>Best regards,<br />CinabOnline Team</p>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Mail sent");
      }
      if (next) {
        next(); // Proceed to the next middleware or route handler
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sellerCenter,
  sendEmails,
  sendSecretCode,
  sendingEmails,
};
