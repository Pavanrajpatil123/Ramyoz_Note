'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function NoteCard({ note }: { note: Note }) {
  const router = useRouter();

  const onDelete = async () => {
    const ok = window.confirm('Delete this note?');
    if (!ok) return;
    const res = await fetch(`/api/notes/${note._id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data?.message || 'Failed to delete');
      return;
    }
    router.refresh();
  };

  const created = new Date(note.createdAt).toLocaleString();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold break-words">{note.title}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap">{created}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-wrap break-words">{note.content}</p>
        <div className="mt-4 flex items-center gap-2">
          <Button size="sm" onClick={() => router.push(`/edit/${note._id}`)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}
