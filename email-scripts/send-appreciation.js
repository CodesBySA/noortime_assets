import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs';

// 1. Your Email Credentials
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('Set EMAIL_USER and EMAIL_PASS in your local .env file.');
} // Put your password here

// 2. Your Links
const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.codesbysa.tadhkir";
const APP_WEB_LINK = "https://play.google.com/apps/testing/com.codesbysa.tadhkir";
const WHATSAPP_LINK = process.env.WHATSAPP_LINK;
if (!WHATSAPP_LINK) {
  throw new Error('Set WHATSAPP_LINK in your local .env file.');
}
const LOGO_URL = "https://www.tadhkirtoday.com/tadhkir-logo.png";

// 3. Your List of Testers
const testers = JSON.parse(
  readFileSync(new URL('./recipients.json', import.meta.url), 'utf8')
);

// Setup Transporter
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

// Helper function to pause between emails
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendEmails() {
  console.log(`Starting to send appreciation emails to ${testers.length} testers...`);

  for (let i = 0; i < testers.length; i++) {
    const { email } = testers[i];

    // Using heavily inline CSS here to ensure broad compatibility, especially for Yahoo Mail Desktop/Mobile apps.
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap');
        </style>
      </head>
      <body style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #F0F4F4; margin: 0; padding: 0;">
        <table width="100%" bgcolor="#F0F4F4" cellpadding="0" cellspacing="0" border="0" style="background-color: #F0F4F4; margin: 0; padding: 20px 0; width: 100%;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 77, 78, 0.08); border: 1px solid #E6F2F2; margin: 0 auto; text-align: left;">

                <!-- Header -->
                <tr>
                  <td style="background-color: #0A4D4E; padding: 40px 20px; text-align: center;">
                    <img src="${LOGO_URL}" alt="Tadhkir Logo" style="width: 80px; height: 80px; margin-bottom: 10px; border-radius: 12px; display: inline-block;">
                    <div style="color: #A4BEA9; font-family: 'Amiri', serif; font-size: 24px; margin-top: 10px;">بسم الله الرحمن الرحيم</div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px; color: #1A2C29; line-height: 1.7; font-size: 16px; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                    <h1 style="font-size: 22px; font-weight: bold; color: #0A4D4E; margin-bottom: 20px; text-align: center; margin-top: 0;">Assalamu Alaykum!</h1>

                    <p style="margin-top: 0; margin-bottom: 20px;">JazakAllah Khair for being with us all the way through our closed testing phase! Your continuous feedback, suggestions, and support have been incredibly valuable in shaping Tadhkir.</p>

                    <!-- Highlight Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F7FAFA; border-radius: 12px; border-left: 4px solid #0A4D4E; margin: 30px 0;">
                      <tr>
                        <td style="padding: 25px; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                          <p style="margin-top: 0; margin-bottom: 15px; text-align: center; font-weight: bold; color: #0A4D4E; font-size: 18px;">A Token of Our Appreciation 🎁</p>
                          <p style="margin-top: 0; margin-bottom: 15px;">To show our gratitude for your dedication, we are thrilled to announce that you will be receiving:</p>
                          <ul style="margin-bottom: 0; padding-left: 20px; line-height: 1.6;">
                            <li style="margin-bottom: 10px;"><strong>6 Months of Free Premium:</strong> Enjoy all the premium features of Tadhkir completely on us!</li>
                            <li><strong>Founding Member Tag:</strong> You will receive an exclusive "Founding Member" tag on your user profile in the next update.</li>
                          </ul>
                        </td>
                      </tr>
                    </table>

                    <p style="margin-top: 0; margin-bottom: 20px;">We couldn't have made it this far without you. Please stay tuned for the next update and the upcoming public launch!</p>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; margin-bottom: 10px;">
                      <tr>
                        <td align="center" style="padding-bottom: 15px;">
                          <a href="${PLAY_STORE_LINK}" style="display: inline-block; background-color: #0A4D4E; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: bold; font-family: 'Inter', Helvetica, Arial, sans-serif; text-align: center;">Get it on Google Play</a>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <a href="${WHATSAPP_LINK}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; font-size: 14px; border-radius: 50px; font-weight: bold; font-family: 'Inter', Helvetica, Arial, sans-serif; text-align: center;">Stay in our WhatsApp Community</a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #FAFAFA; padding: 30px 20px; text-align: center; font-size: 13px; color: #90A4AE; border-top: 1px solid #E6F2F2; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                    <p style="margin: 0; line-height: 1.6;">Fi Amanillah,<br><strong style="color: #1A2C29;">Sajjad & Abdullah</strong><br>The Tadhkir Team</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: '"Tadhkir Team" <team@tadhkirtoday.com>',
        to: email,
        subject: "Thank you for being part of our journey! 🎁 (A Token of Appreciation)",
        html: htmlTemplate,
      });
      console.log(`✅ Appreciation email sent to: ${email}`);
    } catch (error) {
      console.error(`❌ Failed to send to ${email}:`, error.message);
    }

    // Wait 5 seconds before sending the next one
    if (i < testers.length - 1) {
      console.log("Waiting 5 seconds...");
      await sleep(5000);
    }
  }

  console.log("🎉 All appreciation emails have been sent!");
}

sendEmails();
