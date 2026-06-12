export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Loading</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Loading content…</h1>
        <p className="mt-3 text-sm text-slate-600">Please wait while the page loads.</p>
      </div>
    </main>
  );
}
