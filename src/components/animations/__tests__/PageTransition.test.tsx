import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PageTransition from '@/components/animations/PageTransition';
import { setMockPathname } from '@/test/mocks';

describe('PageTransition', () => {
  it('uses home class on the root route', () => {
    setMockPathname('/');

    render(
      <PageTransition>
        <span>Home content</span>
      </PageTransition>,
    );

    const wrapper = screen.getByText('Home content').parentElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('page-transition');
    expect(wrapper).toHaveClass('page-transition--home');
    expect(wrapper).not.toHaveClass('page-transition--route');
    expect(wrapper).toHaveAttribute('data-route', '/');
  });

  it('uses route class on non-home routes', () => {
    setMockPathname('/catalog');

    render(
      <PageTransition>
        <span>Catalog content</span>
      </PageTransition>,
    );

    const wrapper = screen.getByText('Catalog content').parentElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('page-transition');
    expect(wrapper).toHaveClass('page-transition--route');
    expect(wrapper).not.toHaveClass('page-transition--home');
    expect(wrapper).toHaveAttribute('data-route', '/catalog');
  });

  it('updates route metadata when pathname changes', () => {
    setMockPathname('/about');
    const { rerender } = render(
      <PageTransition>
        <span>Route content</span>
      </PageTransition>,
    );

    const firstWrapper = screen.getByText('Route content').parentElement;
    expect(firstWrapper).toHaveAttribute('data-route', '/about');

    setMockPathname('/contact');
    rerender(
      <PageTransition>
        <span>Route content</span>
      </PageTransition>,
    );

    const secondWrapper = screen.getByText('Route content').parentElement;
    expect(secondWrapper).toHaveAttribute('data-route', '/contact');
    expect(secondWrapper).toHaveClass('page-transition--route');
  });
});
