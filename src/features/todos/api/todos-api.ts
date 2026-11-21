import { baseApi } from '@/lib/base-api';
import { todoSchema, todosListSchema } from '../types/schema';
import type { Todo, UpdateTodoDto } from '../types/schema';

export const todosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (rawData: unknown) => todosListSchema.parse(rawData),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todo' as const, id })),
              { type: 'Todo', id: 'LIST' },
            ]
          : [{ type: 'Todo', id: 'LIST' }],
    }),

    addTodo: build.mutation<Todo, Omit<Todo, 'id'>>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body,
      }),
      transformResponse: (rawData: unknown) => todoSchema.parse(rawData),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),

    updateTodo: build.mutation<Todo, { id: string; data: UpdateTodoDto }>({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (rawData: unknown) => todoSchema.parse(rawData),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find((item) => item.id === id);
            if (todo) {
              Object.assign(todo, data);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Todo', id }],
    }),

    deleteTodo: build.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            return draft.filter((item) => item.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (_result, _error, id) => [
        { type: 'Todo', id },
        { type: 'Todo', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
