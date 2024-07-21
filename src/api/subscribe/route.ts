import mongoose, { Document, Schema } from 'mongoose';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';

interface IEmail extends Document {
  email: string;
}

const emailSchema = new Schema<IEmail>({
  email: { type: String, required: true, unique: true }
});

const Email = mongoose.models.Email || mongoose.model<IEmail>('Email', emailSchema);

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log(email, "email backend");

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const newEmail = new Email({ email });
    await newEmail.save();
    return NextResponse.json(
      { message: 'Successfully subscribed to updates from Zack Hazlett Fitness!' },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error code
      return NextResponse.json(
        { error: 'This email is already subscribed to updates from Zack Hazlett Fitness.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Error subscribing to updates from Zack Hazlett Fitness.' },
      { status: 500 }
    );
  }
}
