'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../api/todos-api';
import type { Todo } from '../types/schema';

const EditTodoForm = dynamic(
  () => import('./edit-todo-form').then((module) => module.EditTodoForm),
  {
    loading: () => <span className="text-xs text-muted-foreground">Загрузка формы...</span>,
  }
);

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onStartEdit: () => void;
  onStopEdit: () => void;
};

export function TodoItem({ todo, isEditing, onStartEdit, onStopEdit }: TodoItemProps) {
  const [actionError, setActionError] = useState<string | null>(null);
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleToggle = async (checked: boolean | 'indeterminate') => {
    setActionError(null);
    try {
      await updateTodo({ id: todo.id, data: { completed: checked === true } }).unwrap();
    } catch {
      setActionError('Не удалось обновить статус задачи');
    }
  };

  const handleDelete = async () => {
    setActionError(null);
    try {
      await deleteTodo(todo.id).unwrap();
    } catch {
      setActionError('Не удалось удалить задачу');
    }
  };

  return (
    <li className="flex flex-col gap-1 rounded-lg border bg-card p-3 text-card-foreground shadow-xs transition-colors">
      <div className="flex items-center justify-between gap-3">
        {isEditing ? (
          <div className="flex-1">
            <EditTodoForm
              id={todo.id}
              initialTitle={todo.title}
              onCancel={onStopEdit}
              onSuccess={onStopEdit}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggle}
                disabled={isUpdating}
              />
              <span
                className={`truncate text-sm font-medium ${
                  todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}
              >
                {todo.title}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onStartEdit}
              >
                <Pencil />
                Изменить
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 />
                {isDeleting ? '...' : 'Удалить'}
              </Button>
            </div>
          </>
        )}
      </div>
      {actionError && <p className="text-xs font-medium text-destructive">{actionError}</p>}
    </li>
  );
}
