import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(tasks);
  } catch { return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const task = await prisma.task.create({
      data: { title: body.title, description: body.description || '', status: body.status || 'todo', priority: body.priority || 'medium' },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
