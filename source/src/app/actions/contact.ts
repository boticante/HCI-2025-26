'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'Email service is not configured. Please contact support.',
      };
    }

    if (!process.env.CONTACT_EMAIL_TO) {
      return {
        success: false,
        error: 'Recipient email is not configured. Please contact support.',
      };
    }

    const result = await resend.emails.send({
      from: 'noreply@resend.dev', 
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #192734;">New Contact Form Submission</h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #192734; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; color: #333;">
              ${escapeHtml(data.message)}
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">
            This email was sent from your website's contact form.
          </p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
