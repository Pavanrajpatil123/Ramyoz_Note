import NoteForm from '@/components/NoteForm';

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/notes/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

export default async function EditNotePage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);
  if (!note) {
    return <p className="text-gray-600">Note not found.</p>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
      <NoteForm initialNote={note} />
    </div>
  );
}
