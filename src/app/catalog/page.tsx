'use client';

import { useMemo, useState } from 'react';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import ComplianceNote from '@/components/product/ComplianceNote';
import { ProductCategory, products } from '@/lib/catalog';

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');

  const filteredProducts = useMemo(() => {
    let next = [...products];

    if (activeCategory !== 'all') {
      next = next.filter((product) => product.category === activeCategory);
    }

    if (showInStockOnly) {
      next = next.filter((product) => product.inStock);
    }

    if (sortBy === 'price_low') {
      next.sort((a, b) => a.priceUsd - b.priceUsd);
    }

    if (sortBy === 'price_high') {
      next.sort((a, b) => b.priceUsd - a.priceUsd);
    }

    return next;
  }, [activeCategory, showInStockOnly, sortBy]);

  return (
    <main className="section-shell pb-20 pt-28">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Catalog</p>
        <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">Research peptide library</h1>
        <p className="mt-4 text-sm text-[var(--text-1)]">
          Explore premium placeholder products with per-item subscription controls and volume-aware cart updates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ProductFilters
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          showInStockOnly={showInStockOnly}
          setShowInStockOnly={setShowInStockOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[var(--text-1)]">{filteredProducts.length} products</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <RevealOnScroll key={product.slug} className="h-full" delayMs={index * 70}>
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-8">
            <ComplianceNote />
          </div>
        </div>
      </div>
    </main>
  );
}
