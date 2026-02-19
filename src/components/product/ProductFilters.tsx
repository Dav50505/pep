'use client';

import { ProductCategory, categoryLabels } from '@/lib/catalog';

interface ProductFiltersProps {
  activeCategory: ProductCategory | 'all';
  setActiveCategory: (category: ProductCategory | 'all') => void;
  showInStockOnly: boolean;
  setShowInStockOnly: (value: boolean) => void;
  sortBy: 'featured' | 'price_low' | 'price_high';
  setSortBy: (value: 'featured' | 'price_low' | 'price_high') => void;
}

const categories: Array<ProductCategory | 'all'> = ['all', 'recovery', 'growth', 'metabolic', 'focus'];

export default function ProductFilters({
  activeCategory,
  setActiveCategory,
  showInStockOnly,
  setShowInStockOnly,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  return (
    <aside className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-5 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold text-[var(--text-0)]">Filters</h2>
      <div className="mt-4 space-y-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  activeCategory === category
                    ? 'bg-[var(--accent)] text-[var(--bg-0)]'
                    : 'bg-[var(--surface-elev)] text-[var(--text-1)] hover:text-[var(--text-0)]'
                }`}
              >
                {category === 'all' ? 'All' : categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-[var(--text-1)]">
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(event) => setShowInStockOnly(event.target.checked)}
            className="h-4 w-4 rounded border-[var(--border-soft)] bg-[var(--bg-1)]"
          />
          In-stock only
        </label>

        <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
          Sort
          <select
            className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-1)] px-3 py-2 text-[var(--text-0)]"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as 'featured' | 'price_low' | 'price_high')}
          >
            <option value="featured">Featured</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </label>
      </div>
    </aside>
  );
}
