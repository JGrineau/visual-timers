import Link from 'next/link';


export default function Page() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <h2 className="text-xl font-bold mb-6">Timer Types</h2>
      <nav className="flex flex-col space-y-3">
        <Link href="/pomodoro" className="hover:bg-gray-700 rounded px-3 py-2 transition">
          Pomodoro
        </Link>
        <Link href="/linear" className="hover:bg-gray-700 rounded px-3 py-2 transition">
          Linear
        </Link>
        <Link href="/radial" className="hover:bg-gray-700 rounded px-3 py-2 transition">
          Radial
        </Link>
      </nav>
    </aside>
  );
}
