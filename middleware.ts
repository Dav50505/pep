import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutePatterns = ['/cart(.*)', '/checkout(.*)'] as const;
const isProtectedRoute = createRouteMatcher([...protectedRoutePatterns]);

export function isProtectedPath(pathname: string): boolean {
  return pathname.startsWith('/cart') || pathname.startsWith('/checkout');
}

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

export { protectedRoutePatterns };
