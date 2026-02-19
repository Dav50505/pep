import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerkAppearance';

export default function SignInPage() {
  return (
    <main className="section-shell grid min-h-screen items-center py-28">
      <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6 md:grid-cols-[1.15fr_1fr] md:p-8">
        <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-1)] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Secure Access</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-[var(--text-0)]">Sign in to continue</h1>
          <p className="mt-4 text-sm text-[var(--text-1)]">
            Sign in to add products to cart, access checkout, and retain your personalized subscription selections.
          </p>
          <p className="mt-8 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-4 py-3 text-xs text-[var(--text-1)]">
            Research-use storefront demo. Authentication is required for cart and checkout interactions.
          </p>
          <p className="mt-6 text-sm text-[var(--text-1)]">
            Need an account?{' '}
            <Link href="/sign-up" className="text-[var(--accent)]">
              Create one here.
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center">
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/catalog"
            appearance={clerkAppearance}
          />
        </div>
      </section>
    </main>
  );
}
