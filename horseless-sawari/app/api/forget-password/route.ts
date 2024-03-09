import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();
  const { email } = body;

  const existingUserByEmail = await db.user.findUnique({
    where: { email: email },
  });

  if (!existingUserByEmail) {
    return NextResponse.json(
      { user: null, message: 'Email does not exist' },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const passwordResetExpires = new Date(Date.now() + 3600000);

  await db.user.update({
    where: { email: email },
    data: {
      resetToken: passwordResetToken,
      resetTokenExpiry: passwordResetExpires,
    },
  });

  try {
    const SibApiV3Sdk = require('sib-api-v3-typescript');

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Reset Your Password';
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    console.log('🚀 ~ POST ~ resetUrl:', resetUrl);
    sendSmtpEmail.htmlContent = sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      Dear "${existingUserByEmail.username}"
        <p style="line-height: 1.6; color: #333;">
          Trouble signing in? We've received a request to reset the password on Rental Sawari.
          If you didn't ask to reset your password, you can ignore this email.
        </p>

        <p style="line-height: 1.6; color: #333;">
          To reset your password please follow the link below:
          <br />
          <a href="http://localhost:3000/reset-password/${resetToken}" style="color: #007bff; text-decoration: none;">
            Click here to Reset your password
          </a>
        </p>

        <p style="line-height: 1.6; color: #333;">Thanks</p>
      </div>
    `;
    console.log('Kavya');
    sendSmtpEmail.sender = {
      name: 'Rental Sawari',
      email: 'kavya.timilsina1230@gmail.com',
    };
    sendSmtpEmail.to = [{ email: email, name: existingUserByEmail.username }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending reset email' },
      { status: 500 }
    );
  }
}
