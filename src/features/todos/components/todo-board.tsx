'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector } from '@/store/store';
import { useGetTodosQuery } from '../api/todos-api';
import { AddTodoForm } from './add-todo-form';
import { FilterButtons } from './filter-buttons';
import { TodoItem } from './todo-item';

export function TodoBoard() {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const currentFilter = useAppSelector((state) => state.filter.status);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredTodos = todos?.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos?.filter((t) => !t.completed).length ?? 0;

  return (
    <Card className="mx-auto w-full max-w-xl shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-xl">Список задач</CardTitle>
          <Badge variant="secondary">Осталось: {activeCount}</Badge>
        </div>
        <CardDescription>Next.js App Router + Bulletproof React + RTK Query + Zod + shadcn/ui</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <AddTodoForm />

        <FilterButtons />

        {isLoading && <p className="text-sm text-muted-foreground">Загрузка задач...</p>}

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Ошибка сервера</AlertTitle>
            <AlertDescription>
              Не удалось загрузить список задач с API.
            </AlertDescription>
          </Alert>
        )}

        {filteredTodos && filteredTodos.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Задач по выбранному фильтру нет.
          </p>
        )}

        {filteredTodos && filteredTodos.length > 0 && (
          <ul className="flex flex-col gap-2">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                onStartEdit={() => setEditingId(todo.id)}
                onStopEdit={() => setEditingId(null)}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
