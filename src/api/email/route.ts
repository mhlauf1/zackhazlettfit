import WelcomeEmail from '@/email/welcome';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    await resend.emails.send({
        from: 'mhlauf1@gmail.com',
        to: 'zackhazlettfitness@gmail.com',
        subject: 'hello world',
        react: WelcomeEmail()
    });

    return NextResponse.json({
        status: "ok"
    })
}