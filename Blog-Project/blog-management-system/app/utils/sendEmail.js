const nodemailer = require('nodemailer');

const createTransporter = () => {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const password = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;
  if (!host || !user || !password) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587,
    secure: (process.env.SMTP_SECURE || 'false') === 'true',
    auth: { user, pass: password },
  });
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();
  if (!transporter) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[email:development] To: ${to}\n${text}`);
      return false;
    }
    throw new Error('Email service is not configured');
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
  return true;
};

module.exports = sendEmail;
