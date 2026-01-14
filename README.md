# Command Center Dashboard

Modern command center showing Linear tasks, calendar events, and emails.

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jgealon-compago/linear-dashboard)

### One-Click Deploy

1. Click the "Deploy" button above
2. Sign in to Vercel with GitHub
3. Add your environment variables:
   - `LINEAR_API_KEY` - Your Linear API key
4. Click "Deploy"

Done! Your dashboard will be live in 2 minutes.

---

## 📦 Manual Deploy

```bash
# Clone the repo
git clone https://github.com/jgealon-compago/linear-dashboard.git
cd linear-dashboard

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

Follow the prompts, then add your `LINEAR_API_KEY` in the Vercel dashboard.

---

## 🔑 Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `LINEAR_API_KEY` | `lin_api_xxx` | ✅ Yes |
| `GOOGLE_CLIENT_ID` | Your Google OAuth ID | ⏸️ Later |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Secret | ⏸️ Later |

---

## 🏗️ Project Structure

```
linear-dashboard/
├── app/
│   ├── api/
│   │   └── tasks/route.ts     # Linear API endpoint
│   ├── page.tsx               # Dashboard UI
│   ├── layout.tsx
│   └── globals.css
├── package.json
└── next.config.js
```

---

## 🌐 After Deployment

Your dashboard will be available at:
`https://linear-dashboard-xxx.vercel.app`

You can:
- ✅ Access from any device
- ✅ Share the URL (it's private - requires your API key)
- ✅ Auto-deploys when you push to GitHub
- ✅ Free hosting on Vercel

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## 📱 Features

- Live Linear tasks
- 2-column layout (65% tasks / 35% calendar+email)
- Light/Dark mode toggle
- Auto-refresh capability
- Click tasks to open in Linear

---

Built with Next.js 14, TypeScript, Tailwind CSS