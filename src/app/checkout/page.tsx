'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CartSummaryCard from '@/components/cart/CartSummaryCard';
import EmptyCartState from '@/components/cart/EmptyCartState';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import PaymentStubForm, { PaymentData } from '@/components/checkout/PaymentStubForm';
import PlaceOrderButton from '@/components/checkout/PlaceOrderButton';
import ReviewOrder from '@/components/checkout/ReviewOrder';
import ShippingForm, { ShippingData } from '@/components/checkout/ShippingForm';
import ComplianceNote from '@/components/product/ComplianceNote';
import { useCart } from '@/components/cart/CartProvider';

function isShippingValid(data: ShippingData): boolean {
  return Object.values(data).every((value) => value.trim().length > 1);
}

function isPaymentValid(data: PaymentData): boolean {
  return data.cardName.length > 2 && data.cardNumber.length >= 12 && data.expiry.length >= 4 && data.cvc.length >= 3;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, summary, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [shipping, setShipping] = useState<ShippingData>({
    fullName: '',
    email: '',
    institution: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [payment, setPayment] = useState<PaymentData>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const shippingValid = useMemo(() => isShippingValid(shipping), [shipping]);
  const paymentValid = useMemo(() => isPaymentValid(payment), [payment]);

  if (state.lines.length === 0) {
    return (
      <main className="section-shell pb-20 pt-28">
        <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">Checkout</h1>
        <div className="mt-6">
          <EmptyCartState />
        </div>
      </main>
    );
  }

  const goNext = () => {
    if (step === 1 && shippingValid) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
    }
  };

  const placeOrder = () => {
    if (!paymentValid) {
      return;
    }

    clearCart();
    router.push('/checkout/success');
  };

  return (
    <main className="section-shell pb-20 pt-28">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-1)]">Checkout</p>
        <h1 className="font-display text-5xl leading-none text-[var(--text-0)]">Mock checkout flow</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="space-y-6 rounded-3xl border border-[var(--border-soft)] bg-[var(--surface)] p-6">
          <CheckoutStepper step={step} />

          {step === 1 ? (
            <>
              <ShippingForm value={shipping} onChange={setShipping} />
              <button
                type="button"
                disabled={!shippingValid}
                onClick={goNext}
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)] disabled:opacity-50"
              >
                Continue to Review
              </button>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <ReviewOrder lines={state.lines} />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm text-[var(--text-0)]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--bg-0)]"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <PaymentStubForm value={payment} onChange={setPayment} />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-[var(--border-soft)] px-5 py-3 text-sm text-[var(--text-0)]"
                >
                  Back
                </button>
                <PlaceOrderButton disabled={!paymentValid} onPlaceOrder={placeOrder} />
              </div>
            </>
          ) : null}
        </section>

        <aside className="space-y-4">
          <CartSummaryCard summary={summary} />
          <ComplianceNote compact />
        </aside>
      </div>
    </main>
  );
}
