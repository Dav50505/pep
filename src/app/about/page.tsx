import ComplianceNote from '@/components/product/ComplianceNote';

export default function AboutPage() {
  return (
    <main className="section-shell pb-20 pt-28">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">About</p>
        <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">Quality framework for research supply</h1>
        <p className="mt-4 text-sm text-[var(--text-1)]">
          This storefront demo is designed to present peptide catalog data with a premium scientific aesthetic while
          maintaining strict research-only language.
        </p>
      </div>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">01</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--text-0)]">Lot Transparency</h2>
          <p className="mt-3 text-sm text-[var(--text-1)]">Placeholder COA references, concentration labels, and consistent package metadata.</p>
        </article>
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">02</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--text-0)]">Chain Integrity</h2>
          <p className="mt-3 text-sm text-[var(--text-1)]">Cold-storage handling and release-process placeholders represented throughout the UX.</p>
        </article>
        <article className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">03</p>
          <h2 className="mt-2 text-xl font-semibold text-[var(--text-0)]">Compliance Tone</h2>
          <p className="mt-3 text-sm text-[var(--text-1)]">Research-only positioning is explicitly reinforced on merchandising and checkout surfaces.</p>
        </article>
      </section>

      <section className="mt-10 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-8">
        <h3 className="font-display text-3xl text-[var(--text-0)]">Built for implementation-ready expansion</h3>
        <p className="mt-3 text-sm text-[var(--text-1)]">
          The storefront architecture supports replacing placeholder data with a backend integration while keeping cart
          calculations, subscription cadence controls, and checkout states intact.
        </p>
      </section>

      <div className="mt-6 max-w-3xl">
        <ComplianceNote />
      </div>
    </main>
  );
}
