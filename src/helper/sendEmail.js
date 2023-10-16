import nodemailer from "nodemailer";

export const sendMail = (emailTemplate) => {
  const {emailTo, subject, message} = emailTemplate;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "klabc4.2000@gmail.com",
      pass: "wucnfrpzenjaxogl"
    },
  });

  let mailOptions = {
    from: "klabc4.2000@gmail.com",
    to: emailTo,
    subject,
    html: message,
  };

  return transporter.sendMail(mailOptions); // Return the promise here
};

export default sendMail;
