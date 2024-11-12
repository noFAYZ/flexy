import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Add the email to your audience
    const audience = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      // You can add additional fields if needed
      // firstName: 'John',
      // lastName: 'Doe',
      // unsubscribed: false,
    });

    // Optionally, send a welcome email
    await resend.emails.send({
      from: 'onboarding@yourdomain.com',
      to: email,
      subject: 'Welcome to our waitlist!',
      html: '<p>Thank you for joining our waitlist. We\'ll keep you updated on our progress!</p>'
    });

    return NextResponse.json({ message: 'Email submitted successfully'}, { status: 200 });
  } catch (error) {
    console.error('Error submitting email:', error);
    return NextResponse.json({ error: 'Error submitting email' }, { status: 500 });
  }
}