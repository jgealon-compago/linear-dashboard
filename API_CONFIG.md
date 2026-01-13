// Update the fetchAllData function to use the local API
const API_BASE = 'http://localhost:3001';

const fetchAllData = async () => {
  setLoading(true);
  
  try {
    // Fetch Linear tasks from local API
    const tasksRes = await fetch(`${API_BASE}/api/tasks?assignee=jgealon@compagosolutions.com`);
    const tasksData = await tasksRes.json();
    if (tasksData.tasks) setTasks(tasksData.tasks);

    // Fetch Calendar events  
    const eventsRes = await fetch(`${API_BASE}/api/calendar`);
    const eventsData = await eventsRes.json();
    if (eventsData.events) setEvents(eventsData.events);

    // Fetch Gmail
    const emailsRes = await fetch(`${API_BASE}/api/email`);
    const emailsData = await emailsRes.json();
    if (emailsData.emails) setEmails(emailsData.emails);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Could not connect to API server. Make sure the backend is running on port 3001.');
  } finally {
    setLoading(false);
  }
};