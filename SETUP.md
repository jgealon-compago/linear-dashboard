# Command Center - Local Setup

Modern command center dashboard with live Linear tasks, calendar, and email.

## Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/jgealon-compago/linear-dashboard.git
cd linear-dashboard
```

### 2. Set Up Backend API

```bash
cd backend
npm install

# Create .env file
echo "LINEAR_API_KEY=your_linear_api_key_here" > .env

# Start the API server
npm start
```

The API will run on `http://localhost:3001`

### 3. Open the Dashboard

Simply open `index.html` in your browser, or use a simple HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Getting Your Linear API Key

1. Go to https://linear.app/settings/api
2. Click "Create new key"
3. Copy the key (starts with `lin_api_`)
4. Add it to `backend/.env`

## Project Structure

```
linear-dashboard/
├── backend/
│   ├── server.js          # Express API server
│   ├── package.json
│   └── .env              # Your API keys (create this)
└── index.html            # Dashboard frontend (standalone)
```

## API Endpoints

- `GET /api/tasks?assignee=email@example.com` - Fetch Linear tasks
- `GET /api/calendar` - Fetch calendar events (mock data for now)
- `GET /api/email` - Fetch emails (mock data for now)

## Features

✅ Live Linear tasks from your MCP server  
✅ 2-column layout (65% tasks / 35% calendar+email)  
✅ Light/Dark mode toggle  
✅ Auto-refresh capability  
✅ Click tasks to open in Linear  

## Adding Google Calendar & Gmail

To add real calendar and email data:

1. Get Google OAuth credentials
2. Add to `backend/.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REFRESH_TOKEN=your_refresh_token
   ```
3. Update `backend/server.js` to call Google APIs

## Troubleshooting

**Backend won't start:**
- Check that Node.js is installed: `node --version`
- Make sure you ran `npm install` in the backend folder
- Verify your LINEAR_API_KEY is set in `.env`

**No data showing:**
- Check that the backend is running on port 3001
- Open browser console (F12) and check for errors
- Verify your Linear API key has the right permissions

**CORS errors:**
- Make sure the backend server is running
- The backend has CORS enabled for all origins

---

Built for personal productivity 🚀