'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAddTodoMutation } from '../api/todos-api';
import { createTodoSchema } from '../types/schema';
import type { CreateTodoDto } from '../types/schema';

export function AddTodoForm() {
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateTodoDto>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: CreateTodoDto) => {
    try {
      await addTodo({ title: data.title, completed: false }).unwrap();
      reset();
    } catch {
      setError('title', { message: 'Не удалось сохранить задачу на сервере' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field data-invalid={!!errors.title}>
        <div className="flex gap-2">
          <Input
            type="text"
            {...register('title')}
            placeholder="Новая задача..."
            aria-invalid={!!errors.title}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} className="shrink-0">
            <Plus />
            {isLoading ? 'Добавление...' : 'Добавить'}
          </Button>
        </div>
        <FieldError>{errors.title?.message}</FieldError>
      </Field>
    </form>
  );
}
