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

const sendEmails = async ({ to, subject, verificationLink, username }) => {

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
const sendSecretCode = async (req, res, next) => {
  const mailOptions = {
    from: "onlinecinab@gmail.com",
    to: user.email, // Corrected "emai" to "email"
    subject: subject,
    text: `Dear ${user.name},

    Thank you for joining our family. Your password is ${password}, and ${user.email} is your email. Keep it safe and don't share it with anyone. Kindly reset your password by clicking "Forgot Password" on the login page and follow the procedures.
    
    Best regards,
    CinabOnline`,
  };


  // Send the email using the SMTP transport
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.error(error);
    } else {
      console.error("Mail sent");
    }
    next(); // Proceed to the next middleware or route handler
  });
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
module.exports = {
  sendEmails,
  sendingEmails,
  sendSecretCode
};
