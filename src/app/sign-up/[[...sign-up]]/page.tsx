import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export default function SignUpPage() {
  return (
    <main className="section-shell grid min-h-screen items-center py-28">
      <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 md:grid-cols-[1.15fr_1fr] md:p-8">
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-1)] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Account Setup</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-[var(--text-0)]">Create your account</h1>
          <p className="mt-4 text-sm text-[var(--text-1)]">
            Join to access cart operations, protected checkout pages, and account-linked cart persistence.
          </p>
          <p className="mt-8 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-4 py-3 text-xs text-[var(--text-1)]">
            Research-use storefront demo. Product claims are for presentation only and are not therapeutic guidance.
          </p>
          <p className="mt-6 text-sm text-[var(--text-1)]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[var(--accent)]">
              Sign in.
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/catalog"
            appearance={clerkAppearance}
          />
        </div>
      </section>
    </main>
  );
}
