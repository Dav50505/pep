'use client';

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-[var(--surface)]">
      <button
        type="button"
        onClick={decrement}
        className="h-10 w-10 text-[var(--text-1)] transition hover:text-[var(--text-0)]"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-10 text-center text-sm font-semibold text-[var(--text-0)]">{value}</span>
      <button
        type="button"
        onClick={increment}
        className="h-10 w-10 text-[var(--text-1)] transition hover:text-[var(--text-0)]"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
