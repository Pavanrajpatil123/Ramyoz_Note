import NoteForm from '@/components/NoteForm';

function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

async function getNote(id: string) {
  const res = await fetch(`${getApiUrl()}/notes/${id}`, {
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
