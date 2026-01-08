export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-6 w-32 rounded bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-white p-4">
            <div className="h-5 w-48 rounded bg-gray-200" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-9 w-16 rounded bg-gray-200" />
              <div className="h-9 w-16 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
