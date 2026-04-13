import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Import .mpp file and create project with tasks
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const projectName = formData.get('projectName') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if file is .mpp
    if (!file.name.endsWith('.mpp')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a .mpp file' },
        { status: 400 }
      );
    }

    // Read file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse .mpp file (basic implementation - requires mpxj library)
    // For now, we'll create a placeholder project
    const project = await prisma.project.create({
      data: {
        name: projectName || file.name.replace('.mpp', ''),
        description: `Imported from ${file.name}`,
        status: 'active',
        priority: 'medium',
        createdBy: 'system',
      },
    });

    // TODO: Parse .mpp file using mpxj or similar library
    // and create tasks based on the project plan
    
    // Placeholder: Create sample tasks
    const tasks = [
      {
        title: 'Review imported project plan',
        description: 'Validate all tasks from .mpp import',
        status: 'todo',
        priority: 'high',
        projectId: project.id,
      },
    ];

    const createdTasks = await prisma.task.createMany({
      data: tasks,
    });

    return NextResponse.json(
      {
        project,
        tasksCreated: createdTasks.count,
        message: '.mpp file imported successfully',
        note: 'Full .mpp parsing requires mpxj library integration',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error importing .mpp file:', error);
    return NextResponse.json(
      { error: 'Failed to import .mpp file' },
      { status: 500 }
    );
  }
}

// GET - Get import history
export async function GET(request: NextRequest) {
  try {
    const imports = await prisma.project.findMany({
      where: {
        description: {
          contains: 'Imported from',
        },
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(imports);
  } catch (error) {
    console.error('Error fetching import history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch import history' },
      { status: 500 }
    );
  }
}
