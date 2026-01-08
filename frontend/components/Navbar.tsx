import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Notes
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/new">
            <Button variant="success">+ New Note</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
