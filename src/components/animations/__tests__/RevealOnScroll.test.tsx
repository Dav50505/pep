import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RevealOnScroll from '@/components/animations/RevealOnScroll';

describe('RevealOnScroll', () => {
  const originalIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: originalIntersectionObserver,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: originalIntersectionObserver,
    });
  });

  it('renders visible when IntersectionObserver is unavailable', async () => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: undefined,
    });

    render(
      <RevealOnScroll>
        <span>Fallback reveal</span>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByText('Fallback reveal').parentElement;
    expect(wrapper).not.toBeNull();

    await waitFor(() => {
      expect(wrapper).toHaveClass('is-visible');
    });
  });

  it('toggles visibility based on intersection (replay supported)', () => {
    let observerCallback: IntersectionObserverCallback | null = null;

    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      root = null;
      rootMargin = '';
      thresholds = [0];
      takeRecords = vi.fn(() => []);
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: MockIntersectionObserver,
    });

    render(
      <RevealOnScroll>
        <span>Animated card</span>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByText('Animated card').parentElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('is-visible');
    expect(observerCallback).not.toBeNull();

    act(() => {
      observerCallback?.(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(wrapper).not.toHaveClass('is-visible');

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(wrapper).toHaveClass('is-visible');
  });

  it('applies transition delay for stagger control', () => {
    render(
      <RevealOnScroll delayMs={140}>
        <span>Delayed card</span>
      </RevealOnScroll>,
    );

    const wrapper = screen.getByText('Delayed card').parentElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle({ transitionDelay: '140ms' });
  });
});
