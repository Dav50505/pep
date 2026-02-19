import '@testing-library/jest-dom/vitest';
import React from 'react';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import {
  authMockState,
  navigationMockState,
  resetTestMocks,
  routerPushMock,
} from '@/test/mocks';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
  resetTestMocks();
});

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    const { alt, ...rest } = props;
    delete (rest as { fill?: boolean }).fill;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt ?? ''} {...rest} />;
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => navigationMockState.pathname,
  useRouter: () => ({ push: routerPushMock }),
  useSearchParams: () => new URLSearchParams(navigationMockState.search),
}));

vi.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => ({
    userId: authMockState.userId,
    isSignedIn: Boolean(authMockState.userId),
  }),
  SignedIn: ({ children }: { children: React.ReactNode }) =>
    authMockState.userId ? <>{children}</> : null,
  SignedOut: ({ children }: { children: React.ReactNode }) =>
    authMockState.userId ? null : <>{children}</>,
  UserButton: () => <button type="button">User Menu</button>,
  SignIn: () => <div>Clerk SignIn</div>,
  SignUp: () => <div>Clerk SignUp</div>,
}));
