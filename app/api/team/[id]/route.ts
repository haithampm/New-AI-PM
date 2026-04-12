import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const member = await prisma.teamMember.update({
      where: { id: params.id },
      data: { name: body.name, email: body.email, role: body.role },
    });
    return NextResponse.json(member);
  } catch { return NextResponse.json({ error: 'Not found' }, { status: 404 }); }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.teamMember.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: 'Not found' }, { status: 404 }); }
}
