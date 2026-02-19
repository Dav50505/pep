import ComplianceNote from '@/components/product/ComplianceNote';

export default function ContactPage() {
  return (
    <main className="section-shell pb-20 pt-28">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Contact</p>
        <h1 className="text-center font-display text-5xl leading-none text-[var(--text-0)]">Research support desk</h1>
        <p className="mt-4 text-center text-sm text-[var(--text-1)]">
          Placeholder support workflow for procurement, documentation, and account setup questions.
        </p>

        <form className="mt-8 grid gap-4 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
            Full name
            <input className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)]" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
            Work email
            <input className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)]" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--text-1)] md:col-span-2">
            Subject
            <input className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)]" />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--text-1)] md:col-span-2">
            Message
            <textarea rows={5} className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)]" />
          </label>
          <button
            type="submit"
            className="md:col-span-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)]"
          >
            Send Placeholder Request
          </button>
        </form>

        <div className="mt-6">
          <ComplianceNote />
        </div>
      </div>
    </main>
  );
}
