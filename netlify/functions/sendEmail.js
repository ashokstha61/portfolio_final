const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const { name, email, message } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP server
    port: 465,                // Replace with your SMTP server's port
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Portfolio Contact" <${process.env.EMAIL_USERNAME}>,
    to: process.env.RECEIVER_EMAIL, // Your email address where you'd like to receive the messages
    subject: New message from ${name},
    text: You received a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message},
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};