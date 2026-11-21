'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFilter } from '../store/filter-slice';
import type { FilterStatus } from '../store/filter-slice';

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

export function FilterButtons() {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state) => state.filter.status);

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((item) => {
        const isActive = currentFilter === item.value;
        return (
          <Button
            key={item.value}
            type="button"
            size="sm"
            variant={isActive ? 'default' : 'outline'}
            onClick={() => dispatch(setFilter(item.value))}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );
}
