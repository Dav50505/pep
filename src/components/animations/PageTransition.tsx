'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const transitionClassName = isHome ? 'page-transition page-transition--home' : 'page-transition page-transition--route';

  return (
    <div key={pathname} className={transitionClassName} data-route={pathname}>
      {children}
    </div>
  );
}
