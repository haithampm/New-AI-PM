import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(members);
  } catch { return NextResponse.json([], { status: 200 }); }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const member = await prisma.teamMember.create({
      data: { name: body.name, email: body.email, role: body.role || 'member' },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
