'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

type NoteInput = {
  title: string;
  content: string;
};

type NoteFormProps = {
  initialNote?: { _id: string } & NoteInput;
};

export default function NoteForm({ initialNote }: NoteFormProps) {
  const [title, setTitle] = useState(initialNote?.title ?? '');
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }
    setLoading(true);
    try {
      const method = initialNote ? 'PUT' : 'POST';
      const url = initialNote ? `${getApiUrl()}/notes/${initialNote._id}` : `${getApiUrl()}/notes`;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Request failed');
      router.push('/');
      router.refresh();
    } catch (err: any) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <div className="mt-1">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
            aria-invalid={!title.trim()}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Give your note a short, descriptive title.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <div className="mt-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your note..."
            required
            aria-invalid={!content.trim()}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Use multiple lines; formatting is preserved.</p>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" variant="success" loading={loading}>
          {initialNote ? (loading ? 'Saving…' : 'Save Changes') : (loading ? 'Creating…' : 'Create Note')}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
