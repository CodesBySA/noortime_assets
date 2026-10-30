# Tadhkir email scripts

These scripts send invitations, tester appreciation messages, and donation acknowledgments through Nodemailer and Private Email SMTP.

## Setup

Use Node.js 20.6 or newer. From this folder:

```sh
npm install
cp .env.example .env
cp recipients.example.json recipients.json
```

Fill in `EMAIL_USER` and `EMAIL_PASS` in `.env`. Set `WHATSAPP_LINK` for invitations and appreciation emails. Put the intended recipients in `recipients.json`; `name` is optional and is used by the donation script. The same recipient file is used by all three scripts, so review it before each run.

Both `.env` and `recipients.json` are excluded from Git. Do not commit passwords or real recipient lists.

## Send

Each command immediately sends real emails to the configured recipients:

```sh
npm run invite
npm run appreciation
npm run donation
```

Before sending, review the subject, message, links, and donation date in the relevant script. The donation script currently contains a correction subject asking recipients to disregard a previous email; change it for a normal acknowledgment.
