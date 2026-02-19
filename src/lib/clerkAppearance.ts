import type { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: '#c6d58d',
    colorBackground: '#122231',
    colorText: '#f2f6fb',
    colorTextSecondary: '#a3bbd0',
    colorInputBackground: '#0f1c28',
    colorInputText: '#f2f6fb',
    borderRadius: '14px',
  },
  elements: {
    card: {
      background: 'var(--surface)',
      border: '1px solid var(--border-soft)',
      boxShadow: '0 22px 45px rgba(0,0,0,0.34)',
    },
    headerTitle: {
      color: 'var(--text-0)',
      fontFamily: 'var(--font-display)',
      fontSize: '2rem',
      fontWeight: '600',
      letterSpacing: '0.02em',
    },
    headerSubtitle: {
      color: 'var(--text-1)',
    },
    formButtonPrimary: {
      background: 'var(--accent)',
      color: 'var(--bg-0)',
      borderRadius: '9999px',
      fontWeight: '700',
      boxShadow: 'none',
    },
    formFieldInput: {
      border: '1px solid var(--border-soft)',
      background: 'var(--bg-1)',
      color: 'var(--text-0)',
    },
    formFieldLabel: {
      color: 'var(--text-1)',
    },
    footerActionLink: {
      color: 'var(--accent)',
      textDecoration: 'none',
    },
    dividerLine: {
      background: 'var(--border-soft)',
    },
    socialButtonsBlockButton: {
      border: '1px solid var(--border-soft)',
      background: 'var(--surface-elev)',
      color: 'var(--text-0)',
    },
    identityPreviewText: {
      color: 'var(--text-0)',
    },
  },
};
