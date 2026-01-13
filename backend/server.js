import express from 'express';
import cors from 'cors';
import { LinearClient } from '@linear/sdk';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3001;

// Enable CORS for the frontend
app.use(cors());
app.use(express.json());

// Get Linear API key from environment
const LINEAR_API_KEY = process.env.LINEAR_API_KEY;

if (!LINEAR_API_KEY) {
  console.error('❌ LINEAR_API_KEY not found in environment variables');
  console.error('Please create a .env file with: LINEAR_API_KEY=your_key_here');
  process.exit(1);
}

console.log('✅ Linear API key loaded');

const linear = new LinearClient({ apiKey: LINEAR_API_KEY });

// API endpoint to fetch Linear tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { assignee } = req.query;
    
    const issues = await linear.issues({
      filter: assignee ? {
        assignee: {
          email: { eq: assignee }
        }
      } : undefined,
      first: 100
    });

    const tasks = await Promise.all(
      issues.nodes.map(async (issue) => {
        const state = await issue.state;
        return {
          id: issue.id,
          identifier: issue.identifier,
          title: issue.title,
          description: issue.description || '',
          priority: issue.priority || 0,
          status: state?.name || 'Unknown',
          url: issue.url,
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt
        };
      })
    );

    res.json({ tasks });
  } catch (error) {
    console.error('Error fetching Linear tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for Calendar events (placeholder for now)
app.get('/api/calendar', async (req, res) => {
  try {
    // TODO: Add Google Calendar API integration
    // For now, return mock data
    const events = [
      {
        id: '1',
        title: 'Weekly Team Sync',
        start: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        end: new Date(Date.now() + 90000000).toISOString(),
        location: 'Google Meet'
      },
      {
        id: '2',
        title: 'Client Meeting - Tip Top Drive',
        start: new Date().toISOString(), // Today
        end: new Date(Date.now() + 3600000).toISOString(),
        location: 'On Site'
      }
    ];
    
    res.json({ events });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for Gmail (placeholder for now)
app.get('/api/email', async (req, res) => {
  try {
    // TODO: Add Gmail API integration
    // For now, return mock data
    const emails = [
      {
        id: '1',
        from: 'Steve King',
        subject: 'Re: Tip Top Drive - Change Order Approval',
        snippet: 'Thanks for the update. I\'ve reviewed the change order...',
        time: '2h ago',
        important: true
      },
      {
        id: '2',
        from: 'Travis County Permits',
        subject: 'Permit #2024-1234 - Inspection Scheduled',
        snippet: 'Your inspection has been scheduled for January 15th...',
        time: '5h ago',
        important: true
      }
    ];
    
    res.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Command Center API running on http://localhost:${PORT}`);
  console.log(`📊 Linear tasks: http://localhost:${PORT}/api/tasks`);
  console.log(`📅 Calendar: http://localhost:${PORT}/api/calendar`);
  console.log(`📧 Email: http://localhost:${PORT}/api/email`);
});