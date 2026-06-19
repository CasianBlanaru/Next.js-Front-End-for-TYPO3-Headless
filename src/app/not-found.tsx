import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 text-center">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Page not found</p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">We can’t find that page</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Return Home
        </Link>
      </div>
    </main>
  );
}
