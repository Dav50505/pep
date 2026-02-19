'use client';

interface PlaceOrderButtonProps {
  disabled?: boolean;
  onPlaceOrder: () => void;
}

export default function PlaceOrderButton({ disabled = false, onPlaceOrder }: PlaceOrderButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPlaceOrder}
      className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Place Placeholder Order
    </button>
  );
}
