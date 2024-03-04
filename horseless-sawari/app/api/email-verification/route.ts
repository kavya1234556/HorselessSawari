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

  const verifiedexistingUserByEmail = await db.user.findUnique({
    where: { email: email, isVerified: true },
  });

  if (verifiedexistingUserByEmail) {
    return NextResponse.json(
      { user: null, message: 'Account is already verified' },
      { status: 400 }
    );
  }

  const verificationToken = crypto.randomBytes(20).toString('hex');
  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  const verificationTokenExpires = new Date(Date.now() + 3600000);
  await db.user.update({
    where: { email: email },
    data: {
      emailVerificationToken: emailVerificationToken,
      emailVerificationTokenExpiry: verificationTokenExpires,
    },
  });

  try {
    const SibApiV3Sdk = require('sib-api-v3-typescript');
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Verify Your Email';
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${emailVerificationToken}`;
    sendSmtpEmail.htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <p style="line-height: 1.6; color: #333;">
    Dear customer,
    </p>
    <p style="line-height: 1.6; color: #333;">
    Welcome to Rental Sawari! Please click the following link to verify your email address:
    <br />
    <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
    Click here to verify your email
    </a>
    </p>
    <p style="line-height: 1.6; color: #333;">Thanks</p>
    </div>
    `;
    sendSmtpEmail.sender = {
      name: 'Rental Sawari',
      email: 'kavya.timilsina1230@gmail.com',
    };
    sendSmtpEmail.to = [{ email: email, name: existingUserByEmail.username }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Test1');
    console.log(
      'API called successfully. Returned data: ' + JSON.stringify(data)
    );

    return NextResponse.json({
      message: 'Verification email sent successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error sending verification email' },
      { status: 500 }
    );
  }
}
