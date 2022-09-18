import nodemailer from 'nodemailer';

const sendLoginEmail = async ({
  email,
  url,
  otp,
}: {
  email: string;
  url: string;
  otp: string;
}) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" < rando@email.com >',
    to: email,
    subject: 'Hello ✔',
    html: `Login link: <a href="${url}/login#token=${otp}">Does this work?</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
};

export default sendLoginEmail;
