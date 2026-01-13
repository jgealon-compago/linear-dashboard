'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Mail, CheckSquare, Clock, ExternalLink, Moon, Sun, RefreshCw } from 'lucide-react';

interface Task {
  id: string;
  identifier: string;
  title: string;
  priority: number;
  status: string;
  url: string;
}

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  location?: string;
}

interface Email {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  time: string;
  important: boolean;
}

export default function CommandCenter() {
  const [isDark, setIsDark] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    
    try {
      // Fetch Linear tasks
      const tasksRes = await fetch('/api/tasks?assignee=jgealon@compagosolutions.com');
      const tasksData = await tasksRes.json();
      if (tasksData.tasks) setTasks(tasksData.tasks);

      // Fetch Calendar events  
      const eventsRes = await fetch('/api/calendar');
      const eventsData = await eventsRes.json();
      if (eventsData.events) setEvents(eventsData.events);

      // Fetch Gmail
      const emailsRes = await fetch('/api/email');
      const emailsData = await emailsRes.json();
      if (emailsData.emails) setEmails(emailsData.emails);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: number) => {
    const colors: Record<number, string> = {
      0: isDark ? 'text-slate-400' : 'text-gray-500',
      1: isDark ? 'text-red-400' : 'text-red-600',
      2: isDark ? 'text-orange-400' : 'text-orange-600',
      3: isDark ? 'text-blue-400' : 'text-blue-600'
    };
    return colors[priority] || colors[0];
  };

  const getStatusColor = (status: string) => {
    if (isDark) {
      return status === 'In Progress' 
        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        : status === 'Done'
        ? 'bg-green-500/10 text-green-400 border-green-500/20'
        : status === 'Backlog'
        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
        : 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
    return status === 'In Progress'
      ? 'bg-blue-100 text-blue-700 border-blue-200'
      : status === 'Done'
      ? 'bg-green-100 text-green-700 border-green-200'
      : status === 'Backlog'
      ? 'bg-purple-100 text-purple-700 border-purple-200'
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isToday = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <RefreshCw className={`w-12 h-12 animate-spin mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading your command center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="max-w-[2000px] mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Command Center
              </h1>
              <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchAllData}
                className={`p-2.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2.5 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[2000px] mx-auto px-8 py-6">
        <div className="flex gap-6">
          {/* Left Panel - Tasks (65% width) */}
          <div className="w-[65%]">
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                <CheckSquare className="w-5 h-5" />
                My Tasks
              </h2>
              <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {tasks.length} tasks
              </span>
            </div>
            
            <div className="space-y-2.5">
              {tasks.map(task => (
                <a
                  key={task.id}
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block rounded-xl px-5 py-4 transition-all hover:scale-[1.01] ${
                    isDark
                      ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50'
                      : 'bg-white hover:shadow-md border border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        {task.identifier}
                      </span>
                      <h3 className={`font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {task.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                      {task.priority > 0 && (
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-slate-700/50' : 'bg-gray-100'} ${getPriorityColor(task.priority)}`}>
                          {task.priority === 1 ? 'Urgent' : task.priority === 2 ? 'High' : 'Normal'}
                        </span>
                      )}
                      <ExternalLink className={`w-4 h-4 ${isDark ? 'text-slate-600' : 'text-gray-300'}`} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Panel - Calendar & Email (35% width) */}
          <div className="w-[35%] space-y-6">
            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                  <Calendar className="w-5 h-5" />
                  Calendar
                </h2>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  {events.filter(e => isToday(e.start)).length} today
                </span>
              </div>
              
              <div className="space-y-2.5">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`rounded-xl p-4 ${
                      isToday(event.start)
                        ? isDark
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : 'bg-blue-50 border border-blue-200'
                        : isDark
                        ? 'bg-slate-800/50 border border-slate-700/50'
                        : 'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex flex-col items-center justify-center text-sm font-medium ${
                        isToday(event.start)
                          ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          : isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <div className="text-xs">{formatDate(event.start).substring(0, 3)}</div>
                        <div className="text-base font-semibold">{new Date(event.start).getDate()}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {event.title}
                        </h3>
                        <div className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                          <Clock className="w-3 h-3" />
                          {formatTime(event.start)}
                          {event.end && ` - ${formatTime(event.end)}`}
                        </div>
                        {event.location && (
                          <div className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                            📍 {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                  <Mail className="w-5 h-5" />
                  Inbox
                </h2>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  {emails.length} unread
                </span>
              </div>
              
              <div className="space-y-2.5">
                {emails.map(email => (
                  <div
                    key={email.id}
                    className={`rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] ${
                      email.important
                        ? isDark
                          ? 'bg-orange-500/10 border border-orange-500/20'
                          : 'bg-orange-50 border border-orange-200'
                        : isDark
                        ? 'bg-slate-800/50 border border-slate-700/50'
                        : 'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {email.from}
                      </span>
                      <span className={`text-xs flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                        {email.time}
                      </span>
                    </div>
                    <h3 className={`font-medium text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                      {email.subject}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                      {email.snippet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}