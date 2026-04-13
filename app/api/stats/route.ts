import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [projects, tasks, team, completedTasks, activeTasks] = await Promise.all([
      prisma.project.count(),
      prisma.task.count(),
      prisma.teamMember.count(),
      prisma.task.count({ where: { status: 'done' } }),
      prisma.task.count({ where: { status: 'inprogress' } }),
    ]);
    return NextResponse.json({ projects, tasks, team, completedTasks, activeTasks });
  } catch {
    return NextResponse.json({ projects: 0, tasks: 0, team: 0, completedTasks: 0, activeTasks: 0 });
  }
}
