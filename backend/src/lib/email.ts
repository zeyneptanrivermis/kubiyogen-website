import nodemailer from 'nodemailer';

const transporter = () => {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });
};

export const sendMail = async (input: { to: string; subject: string; text: string }) => {
  const tx = transporter();
  if (!tx) {
    console.log('Email skipped; SMTP_HOST is not configured', input);
    return;
  }

  await tx.sendMail({
    from: process.env.MAIL_FROM ?? 'Kubiyogen <noreply@kubiyogen.com>',
    ...input,
  });
};
