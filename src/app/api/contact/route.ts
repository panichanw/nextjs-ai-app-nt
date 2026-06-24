import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error.errors[0].message 
      }, { status: 400 });
    }

    const { name, email, message } = result.data;

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER_EMAIL || 'admin@example.com',
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองอีกครั้ง' 
    }, { status: 500 });
  }
}
