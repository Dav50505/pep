import { vi } from 'vitest';

interface AuthMockState {
  userId: string | null;
}

interface NavigationMockState {
  pathname: string;
  search: string;
}

export const authMockState: AuthMockState = {
  userId: null,
};

export const navigationMockState: NavigationMockState = {
  pathname: '/catalog',
  search: '',
};

export const routerPushMock = vi.fn<(url: string) => void>();

export function setAuthUser(userId: string | null): void {
  authMockState.userId = userId;
}

export function setMockPathname(pathname: string): void {
  navigationMockState.pathname = pathname;
}

export function setMockSearch(search: string): void {
  navigationMockState.search = search.startsWith('?') ? search.slice(1) : search;
}

export function resetTestMocks(): void {
  authMockState.userId = null;
  navigationMockState.pathname = '/catalog';
  navigationMockState.search = '';
  routerPushMock.mockReset();
}
