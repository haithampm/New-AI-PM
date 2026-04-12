import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description || '',
        status: body.status || 'active',
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
