'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useUpdateTodoMutation } from '../api/todos-api';
import { createTodoSchema } from '../types/schema';
import type { CreateTodoDto } from '../types/schema';

type EditTodoFormProps = {
  id: string;
  initialTitle: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function EditTodoForm({ id, initialTitle, onCancel, onSuccess }: EditTodoFormProps) {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateTodoDto>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

  const onSubmit = async (data: CreateTodoDto) => {
    if (data.title === initialTitle) {
      onCancel();
      return;
    }

    try {
      await updateTodo({ id, data: { title: data.title } }).unwrap();
      onSuccess();
    } catch {
      setError('title', { message: 'Ошибка сохранения' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field data-invalid={!!errors.title}>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            {...register('title')}
            aria-invalid={!!errors.title}
            disabled={isLoading}
            autoFocus
            className="h-8 flex-1 text-sm"
          />
          <Button type="submit" size="sm" disabled={isLoading} className="shrink-0">
            <Check />
            {isLoading ? '...' : 'Сохранить'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
            className="shrink-0"
          >
            <X />
            Отмена
          </Button>
        </div>
        <FieldError>{errors.title?.message}</FieldError>
      </Field>
    </form>
  );
}
