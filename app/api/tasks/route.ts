import { LinearClient } from '@linear/sdk';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const assignee = searchParams.get('assignee');

  if (!process.env.LINEAR_API_KEY) {
    return NextResponse.json({ error: 'LINEAR_API_KEY not configured' }, { status: 500 });
  }

  try {
    const linear = new LinearClient({ apiKey: process.env.LINEAR_API_KEY });
    
    const issues = await linear.issues({
      filter: assignee ? {
        assignee: {
          email: { eq: assignee }
        }
      } : undefined,
      first: 50
    });

    const tasks = await Promise.all(
      issues.nodes.map(async (issue) => ({
        id: issue.id,
        identifier: issue.identifier,
        title: issue.title,
        description: issue.description || '',
        priority: issue.priority || 0,
        status: (await issue.state)?.name || 'Unknown',
        url: issue.url,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt
      }))
    );

    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Linear API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}