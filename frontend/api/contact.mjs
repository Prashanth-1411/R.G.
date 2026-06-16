import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address, requirements, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A1F44; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0;">R.G. Ambulance Service</h2>
          <p style="color: #90A4AE; margin: 5px 0 0; font-size: 12px;">New Contact Form Inquiry</p>
        </div>
        <div style="background: #f8f9fc; padding: 25px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 8px 12px; color: #555;">${name}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 12px; color: #555;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 12px; color: #555;">${phone}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Address:</td>
              <td style="padding: 8px 12px; color: #555;">${address || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Service:</td>
              <td style="padding: 8px 12px; color: #555;">${requirements}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 8px; border-left: 4px solid #0047AB;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #333; font-size: 13px;">Message:</p>
            <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.6;">${message}</p>
          </div>
        </div>
        <div style="text-align: center; padding: 15px; color: #90A4AE; font-size: 11px;">
          <p style="margin: 0;">Sent from R.G. Ambulance Service Contact Form</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'ebenezer.r@rgambulanceservice.com',
      subject: `Contact Form Inquiry from ${name} - ${requirements} Service`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || 'N/A'}\nService Required: ${requirements}\nMessage: ${message}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
