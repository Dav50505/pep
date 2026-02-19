import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import PageTransition from '@/components/animations/PageTransition';

const uiSans = localFont({
  src: [
    {
      path: './fonts/manrope-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/manrope-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/manrope-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-ui',
  display: 'swap',
});

const displaySerif = localFont({
  src: [
    {
      path: './fonts/cormorant-garamond-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/cormorant-garamond-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/cormorant-garamond-latin-700-normal.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PEPT Research Supply',
  description: 'Premium research-use peptide storefront demo with placeholder commerce flows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${uiSans.variable} ${displaySerif.variable} bg-[var(--bg-0)] text-[var(--text-0)] antialiased`}>
        <ClerkProvider>
          <CartProvider>
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
