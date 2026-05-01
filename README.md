# Nikhil Sahani — Portfolio

Built with **Next.js 15** · **Tailwind CSS** · **Cloudflare Pages** via OpenNext.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Fonts | Playfair Display + DM Sans (Google Fonts) |
| Hosting | Cloudflare Pages via OpenNext |
| Domain | Cloudflare DNS |
| Contact form | AWS SES (plug in `/app/api/contact/route.ts`) |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Editing content

| What to change | File |
|----------------|------|
| Your projects | `components/Projects.tsx` → edit the `projects` array |
| About text / bio | `components/About.tsx` |
| Skills list | `components/Skills.tsx` → edit the `categories` array |
| Social links | `components/About.tsx`, `components/Footer.tsx`, `components/Navbar.tsx` |
| Email address | `components/Contact.tsx` |
| Page metadata | `app/layout.tsx` |

---

## Deploy to Cloudflare Pages

### 1. Build locally
```bash
npm run build
```

### 2. Preview locally
```bash
npm run preview
```

### 3. Deploy
```bash
npm run deploy
```

Or connect your GitHub repo in the Cloudflare Pages dashboard and set:
- **Build command:** `npm run build`
- **Build output directory:** `.open-next/assets`

### 4. Add your domain
In Cloudflare Pages → your project → Custom Domains → add `nikhilsahani.in`  
Since your domain is already on Cloudflare DNS, it auto-configures. ✓

---

## Contact form with AWS SES

Edit `/app/api/contact/route.ts` and add:

```bash
npm install @aws-sdk/client-ses
```

```ts
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({ region: 'ap-south-1' })

await ses.send(new SendEmailCommand({
  Source: 'hello@nikhilsahani.in',
  Destination: { ToAddresses: ['hello@nikhilsahani.in'] },
  Message: {
    Subject: { Data: `Portfolio contact from ${name}` },
    Body: { Text: { Data: `From: ${email}\n\n${message}` } },
  },
}))
```

Add your AWS credentials as Cloudflare Pages environment variables:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
