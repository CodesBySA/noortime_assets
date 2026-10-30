import nodemailer from 'nodemailer';
import { readFileSync } from 'node:fs';

// 1. Your Email Credentials
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error('Set EMAIL_USER and EMAIL_PASS in your local .env file.');
}

// 2. Assets
const LOGO_URL = "https://www.tadhkirtoday.com/tadhkir-logo.png";

// 3. Donation Details
const DONOR_NAME = "Brother/Sister"; // Replace with donor's name

const DONATION_DATE = "April 2, 2026"; // Replace with actual date

// 4. Recipients
const donors = JSON.parse(
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
  console.log(`Starting to send donation acknowledgment emails to ${donors.length} donor(s)...`);

  for (let i = 0; i < donors.length; i++) {
    const { email, name } = donors[i];
    const donorName = name || "Brother/Sister";

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
                    <h1 style="font-size: 22px; font-weight: bold; color: #0A4D4E; margin-bottom: 20px; text-align: center; margin-top: 0;">Donation Acknowledgment</h1>

                    <p style="margin-top: 0; margin-bottom: 20px;">Assalamu Alaykum <strong>${donorName}</strong>,</p>

                    <p style="margin-top: 0; margin-bottom: 20px;">JazakAllah Khair for your generous donation to support <strong>Tadhkir</strong>. This is received strictly as a <strong>Sadaqah/donation</strong>.</p>

                    <!-- Quranic Reminder Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F7FAFA; border-radius: 12px; border-left: 4px solid #0A4D4E; margin: 30px 0;">
                      <tr>
                        <td style="padding: 25px; font-family: 'Inter', Helvetica, Arial, sans-serif; text-align: center;">
                          <div style="font-family: 'Amiri', serif; font-size: 22px; color: #0A4D4E; line-height: 1.8; margin-bottom: 12px; direction: rtl;">
                            مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنۢبُلَةٍۢ مِّا۟ئَةُ حَبَّةٍۢ ۗ وَٱللَّهُ يُضَـٰعِفُ لِمَن يَشَآءُ ۗ وَٱللَّهُ وَٰسِعٌ عَلِيمٌ
                          </div>
                          <p style="margin: 0; font-size: 14px; color: #5A7A7B; line-height: 1.6; font-style: italic;">"The example of those who spend their wealth in the cause of Allah is that of a grain that sprouts into seven ears, each bearing a hundred grains. And Allah multiplies ˹the reward even more˺ to whoever He wills. For Allah is All-Bountiful, All-Knowing."</p>
                          <p style="margin: 8px 0 0 0; font-size: 13px; color: #90A4AE;">- Surah Al-Baqarah (2:261)</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Donation Details Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F7FAFA; border-radius: 12px; border: 1px solid #E6F2F2; margin: 25px 0;">
                      <tr>
                        <td style="padding: 25px; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                          <p style="margin-top: 0; margin-bottom: 15px; text-align: center; font-weight: bold; color: #0A4D4E; font-size: 17px;">Donation Details</p>
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 15px; color: #1A2C29;">

                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #E6F2F2;"><strong>Purpose:</strong></td>
                              <td style="padding: 8px 0; border-bottom: 1px solid #E6F2F2; text-align: right;">General Donation Support</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0; border-bottom: 1px solid #E6F2F2;"><strong>Date:</strong></td>
                              <td style="padding: 8px 0; border-bottom: 1px solid #E6F2F2; text-align: right;">${DONATION_DATE}</td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;"><strong>Nature:</strong></td>
                              <td style="padding: 8px 0; text-align: right;">Sadaqah (Voluntary Charity)</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Disclaimer -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF9F0; border-radius: 12px; border-left: 4px solid #E6A817; margin: 25px 0;">
                      <tr>
                        <td style="padding: 20px; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                          <p style="margin: 0; font-size: 14px; color: #5A4A2B; line-height: 1.6;"><strong>Important Disclaimer:</strong> This donation is accepted purely as Sadaqah Jariya. It does not constitute an investment, and no equity, ownership stake, profit-sharing, or any form of financial return is implied or guaranteed. This contribution is solely to support Tadhkir.</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin-top: 20px; margin-bottom: 10px;">May Allah ﷻ accept your Sadaqah, multiply your reward, and make it a means of benefit for the entire Ummah. Ameen.</p>

                    <!-- Dua Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0;">
                      <tr>
                        <td style="text-align: center; padding: 15px;">
                          <div style="font-family: 'Amiri', serif; font-size: 20px; color: #0A4D4E; line-height: 1.8; direction: rtl;">
                            اللَّهُمَّ بَارِكْ لَهُ فِي مَالِهِ وَأَهْلِهِ
                          </div>
                          <p style="margin: 5px 0 0 0; font-size: 13px; color: #90A4AE; font-style: italic;">"O Allah, bless him/her in their wealth and family."</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #FAFAFA; padding: 30px 20px; text-align: center; font-size: 13px; color: #90A4AE; border-top: 1px solid #E6F2F2; font-family: 'Inter', Helvetica, Arial, sans-serif;">
                    <p style="margin: 0; line-height: 1.6;">Fi Amanillah,<br><strong style="color: #1A2C29;">Sajjad & Abdullah</strong><br>The Tadhkir Team</p>
                    <p style="margin: 15px 0 0 0; font-size: 11px; color: #B0BEC5;">This acknowledgment is for your personal records only.</p>
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
        //subject: "Donation Acknowledgment - JazakAllah Khair for Your Sadaqah 🤲",
        subject: "Please Disregard Previous Email - Donation Acknowledgment & JazakAllah Khair 🤲",
        html: htmlTemplate,
      });
      console.log(`✅ Donation acknowledgment sent to: ${email}`);
    } catch (error) {
      console.error(`❌ Failed to send to ${email}:`, error.message);
    }

    // Wait 5 seconds before sending the next one
    if (i < donors.length - 1) {
      console.log("Waiting 5 seconds...");
      await sleep(5000);
    }
  }

  console.log("🎉 All donation acknowledgment emails have been sent!");
}

sendEmails();
