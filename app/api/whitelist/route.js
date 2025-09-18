import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Email from '@/models/Email';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, consent } = body;

    if (!email || !consent) {
      return NextResponse.json(
        { error: 'Email and consent are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const existingEmail = await Email.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     request.ip || null;
    
    const userAgent = request.headers.get('user-agent') || null;

    const newEmail = new Email({
      email: email.toLowerCase(),
      consent,
      ipAddress,
      userAgent,
    });

    await newEmail.save();

    return NextResponse.json(
      { 
        message: 'Successfully joined the whitelist!',
        email: newEmail.email,
        timestamp: newEmail.createdAt 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Whitelist API Error:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 