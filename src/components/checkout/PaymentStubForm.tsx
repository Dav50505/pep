'use client';

export interface PaymentData {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface PaymentStubFormProps {
  value: PaymentData;
  onChange: (next: PaymentData) => void;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2 text-[var(--text-0)] outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

export default function PaymentStubForm({ value, onChange }: PaymentStubFormProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field
        label="Cardholder name"
        value={value.cardName}
        onChange={(cardName) => onChange({ ...value, cardName })}
        placeholder="Research Ops Team"
      />
      <Field
        label="Card number"
        value={value.cardNumber}
        onChange={(cardNumber) => onChange({ ...value, cardNumber })}
        placeholder="4242 4242 4242 4242"
      />
      <Field
        label="Expiry"
        value={value.expiry}
        onChange={(expiry) => onChange({ ...value, expiry })}
        placeholder="12/28"
      />
      <Field
        label="CVC"
        value={value.cvc}
        onChange={(cvc) => onChange({ ...value, cvc })}
        placeholder="123"
      />
    </div>
  );
}
