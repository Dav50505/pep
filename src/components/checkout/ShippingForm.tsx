'use client';

export interface ShippingData {
  fullName: string;
  email: string;
  institution: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface ShippingFormProps {
  value: ShippingData;
  onChange: (next: ShippingData) => void;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: keyof ShippingData;
  value: string;
  onChange: (name: keyof ShippingData, next: string) => void;
  type?: 'text' | 'email';
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--text-1)]">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-2 text-[var(--text-0)] outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

export default function ShippingForm({ value, onChange }: ShippingFormProps) {
  const updateField = (name: keyof ShippingData, next: string) => {
    onChange({
      ...value,
      [name]: next,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Full name" name="fullName" value={value.fullName} onChange={updateField} />
      <Field label="Email" name="email" value={value.email} onChange={updateField} type="email" />
      <Field label="Institution" name="institution" value={value.institution} onChange={updateField} />
      <Field label="Address" name="address" value={value.address} onChange={updateField} />
      <Field label="City" name="city" value={value.city} onChange={updateField} />
      <Field label="State" name="state" value={value.state} onChange={updateField} />
      <Field label="ZIP" name="zip" value={value.zip} onChange={updateField} />
    </div>
  );
}
