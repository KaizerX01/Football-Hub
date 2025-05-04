import ContactEmail from '@/Components/Email/ContactEmail';
import { render } from '@react-email/components';
import React from 'react';
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

// Initialize the Resend client (with your API key)

export async function POST(req: NextRequest) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { name, email,subject, message } = await req.json();
        
        // Cast ContactEmail as a JSX component function
        const emailHtml = render(
            React.createElement(ContactEmail as any, { name, email, message })
        );
        const renderedHtml = await emailHtml;
        
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'tshensowgamer2004@gmail.com',
            subject: subject,
            html: renderedHtml,
          });
        
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}