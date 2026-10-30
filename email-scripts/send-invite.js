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
  console.log(`Starting to send ${testers.length} reminders...`);

  for (let i = 0; i < testers.length; i++) {
    const { email } = testers[i];

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap');
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #F0F4F4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(10, 77, 78, 0.08); border: 1px solid #E6F2F2; }
          .header { background-color: #0A4D4E; padding: 40px 20px; text-align: center; }
          .logo { width: 80px; height: 80px; margin-bottom: 10px; border-radius: 12px; }
          .bismillah { color: #A4BEA9; font-family: 'Amiri', serif; font-size: 24px; margin-top: 10px; }
          .content { padding: 40px 30px; color: #1A2C29; line-height: 1.7; }
          .h1 { font-size: 22px; font-weight: bold; color: #0A4D4E; margin-bottom: 20px; text-align: center; }
          .footer { background-color: #FAFAFA; padding: 30px 20px; text-align: center; font-size: 12px; color: #90A4AE; border-top: 1px solid #E6F2F2; }
          .btn-primary { display: block; width: fit-content; margin: 10px auto; background-color: #0A4D4E; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 600; text-align: center; }
          .btn-secondary { display: block; width: fit-content; margin: 20px auto; background-color: #25D366; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 600; text-align: center; }
          .highlight-box { background-color: #F7FAFA; padding: 20px; border-radius: 12px; border-left: 4px solid #0A4D4E; margin: 20px 0; font-size: 14px;}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="${LOGO_URL}" alt="Tadhkir Logo" class="logo">
            <div class="bismillah">بسم الله الرحمن الرحيم</div>
          </div>
          <div class="content">
            <div class="h1">Assalamu Alaykum!</div>

            <p>Since the very name of our app means "Reminder," it's only fitting that we do our job and send you a gentle <em>tadhkir</em>! ⏳</p>

            <p>First off, a huge JazakAllah Khair to those of you who have already installed the app. If that's you, feel free to ignore this message (though we highly recommend jumping into our WhatsApp community below if you haven't yet!).</p>

            <p>If you haven't had a chance to download the app yet, no worries at all! We know inboxes get busy, so we just wanted to bring this back to the top of yours. Your feedback is incredibly valuable in helping us catch bugs before we launch to the public.</p>

            <div class="highlight-box">
              <p style="margin-top: 0; text-align: center;"><strong>Step 1: Join the Shura (Consultation)</strong></p>
              <p style="margin-bottom: 0; text-align: center;">Whether you've installed the app or are running into issues downloading it, our WhatsApp community is the best place to share feedback, request features, and reach us directly.</p>
              <a href="${WHATSAPP_LINK}" class="btn-secondary">Join WhatsApp Community</a>
            </div>

            <p style="text-align: center; margin-top: 30px; margin-bottom: 10px;"><strong>Step 2: Download the App</strong></p>
            <p style="font-size: 14px; text-align: center; margin-top: 0;"><em>Note: You must use the exact email address you provided us to access the testing track.</em></p>

            <a href="${PLAY_STORE_LINK}" class="btn-primary">Download Tadhkir on Google Play</a>
            <a href="${APP_WEB_LINK}" class="btn-primary">View Tadhkir on Web</a>

          </div>
          <div class="footer">
            <p>Fi Amanillah,<br><strong>Sajjad & Abdullah</strong><br>The Tadhkir Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: '"Tadhkir Team" <team@tadhkirtoday.com>',
        to: email,
        subject: "A gentle Tadhkir (Reminder) to join our testing! ⏳",
        html: htmlTemplate,
      });
      console.log(`✅ Reminder sent to: ${email}`);
    } catch (error) {
      console.error(`❌ Failed to send to ${email}:`, error.message);
    }

    // Wait 5 seconds before sending the next one
    if (i < testers.length - 1) {
      console.log("Waiting 5 seconds...");
      await sleep(5000);
    }
  }

  console.log("🎉 All reminders have been sent!");
}

sendEmails();
