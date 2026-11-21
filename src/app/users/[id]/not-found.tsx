import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserNotFound() {
  return (
    <Card className="mx-auto w-full max-w-md text-center shadow-sm">
      <CardHeader>
        <CardTitle>Пользователь не найден</CardTitle>
        <CardDescription>
          Запрошенный ID не существует в базе данных.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/users">Вернуться к списку пользователей</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
