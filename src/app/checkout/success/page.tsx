import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="section-shell pb-24 pt-28">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-10 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--success)]">Order Submitted</p>
        <h1 className="mt-3 font-display text-5xl leading-none text-[var(--text-0)]">Placeholder order confirmed</h1>
        <p className="mt-4 text-sm text-[var(--text-1)]">
          This is a mock checkout success state. No payment was processed and no real fulfillment workflow was started.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/catalog" className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)]">
            Return to Catalog
          </Link>
          <Link href="/" className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm text-[var(--text-0)]">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
