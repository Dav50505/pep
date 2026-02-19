import { CartLine } from '@/lib/catalog';
import { computeLineTotal, formatCurrency, formatVolume, resolveProduct } from '@/lib/cartMath';

interface ReviewOrderProps {
  lines: CartLine[];
}

export default function ReviewOrder({ lines }: ReviewOrderProps) {
  return (
    <div className="space-y-3">
      {lines.map((line) => {
        const product = resolveProduct(line);
        if (!product) {
          return null;
        }

        return (
          <div
            key={line.lineId}
            className="flex items-center justify-between rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3"
          >
            <div>
              <p className="font-medium text-[var(--text-0)]">{product.name}</p>
              <p className="text-xs text-[var(--text-1)]">
                {line.quantity} vials · {formatVolume(line.unitVolumeMl * line.quantity)} · {line.purchaseType}
              </p>
            </div>
            <p className="text-sm font-semibold text-[var(--text-0)]">{formatCurrency(computeLineTotal(line))}</p>
          </div>
        );
      })}
    </div>
  );
}
