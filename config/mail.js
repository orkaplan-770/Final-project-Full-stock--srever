import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: 'ברוכים הבאים לסטודיו לצילום!',
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; text-align: center;">
          <h2>שלום ${userName},</h2>
          <p>תודה שנרשמת למועדון הלקוחות של הסטודיו לצילום שלנו!</p>
          <p>נשמח לעמוד לשירותך בכל שאלה במייל.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to: ${toEmail}`);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};
export default transporter;