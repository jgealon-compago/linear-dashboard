# Command Center Dashboard

Modern command center dashboard showing Linear tasks, Google Calendar events, and Gmail messages.

## Features

- ✅ Live Linear tasks (assigned to you)
- ✅ Upcoming calendar events
- ✅ Unread emails
- ✅ Light/Dark mode toggle
- ✅ 2-column layout (65% tasks / 35% calendar+email)
- ✅ Auto-refresh capability

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jgealon-compago/linear-dashboard)

### 1. Click "Deploy" button above

### 2. Add Environment Variables

In Vercel dashboard, add these environment variables:

```
LINEAR_API_KEY=lin_api_your_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret  
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

### 3. Get Your API Keys

**Linear API Key:**
1. Go to https://linear.app/settings/api
2. Create new Personal API key
3. Copy the key (starts with `lin_api_`)

**Google OAuth (for Calendar + Gmail):**
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable Google Calendar API and Gmail API
4. Create OAuth 2.0 credentials
5. Get your Client ID, Client Secret, and Refresh Token

### 4. Deploy!

Vercel will automatically build and deploy your dashboard.

## Local Development

```bash
# Install dependencies
npm install

# Copy .env.example to .env.local and add your keys
cp .env.example .env.local

# Run development server
npm run dev
```

Open http://localhost:3000

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Linear SDK
- Google APIs

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── tasks/route.ts       # Linear API endpoint
│   │   ├── calendar/route.ts    # Google Calendar endpoint  
│   │   └── email/route.ts       # Gmail endpoint
│   ├── page.tsx                 # Main dashboard page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── package.json
└── next.config.js
```

## API Endpoints

- `GET /api/tasks?assignee=email@example.com` - Fetch Linear tasks
- `GET /api/calendar` - Fetch upcoming calendar events
- `GET /api/email` - Fetch unread emails

---

Built with ❤️ for personal productivity