interface CheckoutStepperProps {
  step: 1 | 2 | 3;
}

const labels = ['Shipping', 'Review', 'Payment'];

export default function CheckoutStepper({ step }: CheckoutStepperProps) {
  return (
    <ol className="grid grid-cols-3 gap-2">
      {labels.map((label, index) => {
        const current = index + 1;
        const isActive = current === step;
        const isComplete = current < step;

        return (
          <li
            key={label}
            className={`rounded-xl border px-3 py-2 text-center text-xs uppercase tracking-[0.15em] ${
              isActive
                ? 'border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--text-0)]'
                : isComplete
                  ? 'border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]'
                  : 'border-[var(--border-soft)] bg-[var(--surface)] text-[var(--text-1)]'
            }`}
          >
            {label}
          </li>
        );
      })}
    </ol>
  );
}
