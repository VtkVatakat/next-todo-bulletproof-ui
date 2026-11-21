import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { updateTodoSchema } from '@/features/todos/types/schema';
import type { Todo } from '@/features/todos';

type DbSchema = {
  todos: Todo[];
  users?: unknown[];
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body: unknown = await request.json();
    const parsed = updateTodoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues?.message ?? 'Некорректные данные' },
        { status: 400 }
      );
    }

    const db = await readDb<DbSchema>();
    const index = db.todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Задача не найдена' }, { status: 404 });
    }

    db.todos[index] = {
      ...db.todos[index],
      ...parsed.data,
    };

    await writeDb(db);
    return NextResponse.json(db.todos[index]);
  } catch {
    return NextResponse.json({ message: 'Ошибка при обновлении задачи' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const db = await readDb<DbSchema>();
    const filtered = db.todos.filter((t) => t.id !== id);

    if (filtered.length === db.todos.length) {
      return NextResponse.json({ message: 'Задача не найдена' }, { status: 404 });
    }

    db.todos = filtered;
    await writeDb(db);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Ошибка при удалении задачи' }, { status: 500 });
  }
}
