'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'li' | 'span';
}

export default function RevealOnScroll({
  children,
  className,
  delayMs = 0,
  as: Tag = 'div',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);
  const canObserve = typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined';
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!canObserve) {
      return;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      },
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };
  }, [canObserve]);

  const classes = ['reveal-on-scroll', isVisible ? 'is-visible' : '', className].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}
