import NoteCard, { type Note } from '@/components/NoteCard';

// Force dynamic rendering to always show latest notes
export const dynamic = 'force-dynamic';

async function getNotes(): Promise<Note[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/notes`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const notes = await getNotes();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">All Notes</h2>
      {notes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
          <p className="mb-2 text-base">You don’t have any notes yet.</p>
          <p className="text-sm">Use the “+ New Note” button in the top right to create your first note.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((n) => (
            <NoteCard key={n._id} note={n} />
          ))}
        </div>
      )}
    </div>
  );
}
