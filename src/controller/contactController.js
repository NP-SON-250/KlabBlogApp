const Contact = require('../model/contactModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
 auth: {
        user: "klabc4.2000@gmail.com",
        pass: "wucnfrpzenjaxogl"
    }
});

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;
  const attachment = req.file ? req.file.path : null;

  const newContact = new Contact({ name, email, message, attachment });

  try {
    await newContact.save();

    const mailOptions = {
      from: 'klabc4.2000@gmail.com', 
      to: 'hakizimanaalexis123@gmail.com', 
      subject: 'Klab user contact message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      attachments: attachment ? [{ path: attachment }] : [], // Attach file if it was uploaded
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error sending message');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Message sent successfully!');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message');
  }
};
