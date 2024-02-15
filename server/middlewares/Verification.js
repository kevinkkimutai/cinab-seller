const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "mail.cinab.co.ke",
  port: 465,
  secure: true,
  auth: {
    user: "seller@cinab.co.ke",
    pass: "cinab@2024",
  },
  tls: { rejectUnauthorized: false },
});

const sendEmails = async ({ to, subject, verificationLink, username }) => {
  console.log("verificationLink", verificationLink);
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

const sendingEmails = async ({ to, from, subject, text }) => {
  try {
    // Send the email
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendSecretCode = async ({ email, secretCode, next }) => {
  try {
    const mailOptions = {
      from: '"Do-not-reply" <seller@cinab.co.ke>',
      to: email,
      subject: "Congratulations welcome to Cinab seller platform",
      html: `
        <p>Dear Esteemed Customer</p>
        <p>Dear esteemed customer thanks you for choosing CINAB to be your e-commerce partner.We are happy to have you work with us, we believe the platform will enable your organization achieved its business goals.</p>
        <p>Please click the link below to get started:</p><a href="${secretCode}">Click here</a>
        <p>If you did not request this, please report it to us at info@cinab.co.ke.</p>
        <p>Best regards,<br />Administrator <br />Tel: 0718888628</p>
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

const UnderVerification = async ({ username, email, next }) => {
  try {
    const mailOptions = {
      from: '"Cinab" <seller@cinab.co.ke>',
      to: email,
      subject: "Account Under Review",
      html: `
      <p>Dear ${username},</p>

      <p>Thank you for selecting CINAB as your e-commerce partner. We're thrilled about our upcoming business collaboration. Your account is currently under review. Rest assured, we're carefully examining the information provided to ensure a seamless onboarding process.</p>
      
      <p>We appreciate your patience during this review. If you have urgent questions, please contact us at <a href="mailto:info@cinab.co.ke">info@cinab.co.ke</a> / <a href="tel:+254718888628">+254718888628</a>.</p>
      
      <p>Thank you for your cooperation. We're eager to assist you in achieving your business objectives through our platform.</p>
      
      <p>Best regards,<br/>The CINAB Team</p>
      
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log / ("Mail sent For Review");
      }
      if (next) {
        next(); // Proceed to the next middleware or route handler
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


const sendVerification = async ({ email, contact, companyName, next }) => {
  try {
    const mailOptions = {
      from: `${companyName} <seller@cinab.co.ke>`,
      to: "cinabonline@gmail.com",
      subject: "Waiting For Verification",
      html: `
        <p>Dear Team</p>
        <p>Iam Waiting for Your Review: ${companyName}</p>
        <p>Best regards,<br />${email} <br />Tel: ${contact}</p>
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
      from: '"Do-not-reply" <seller@cinab.co.ke>',
      to: email,
      subject: "Congratulations welcome to Cinab e platform",
      html: `
        <p>Dear ${companyName},</p>
        <p>Thanks you for choosing CINAB to be your e-commerce partner </p>
        <p>We are happy to have you work with us, we believe the platform will enable your organization achieved its business goals.</p>
        <p>We are thrilled to inform you about some exciting new changes that will enhance your experience on our platform.</p>
        <p>To explore these updates and make the most of our improved features, please click the link below:</p>
        <a href="${link}">Click here to get started</a>
        <p>If you did not initiate this request, kindly report it to us at info@cinab.co.ke.</p>
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
  sendVerification,
  sendingEmails,
  UnderVerification,
};
