# Product Requirements Document (PRD)

## Product Name
PEPT Research Supply Storefront (Demo)

## Document Status
Draft v0.1  
Date: February 19, 2026

## 1. Purpose
Build a premium, research-use-only peptide storefront demo that showcases:
- High-end catalog browsing
- Auth-gated cart and checkout flows
- Subscription and one-time purchase options
- Volume-aware pricing logic

This product is currently a frontend-heavy demo and should be structured so it can later connect to real commerce and fulfillment systems.

## 2. Goals
- Present a polished, trustworthy storefront for peptide research products.
- Let signed-in users add/manage items in cart and complete a mock checkout.
- Demonstrate subscription cadence controls and pricing behavior.
- Keep architecture modular so placeholder data can be replaced by backend APIs.

## 3. Non-Goals (Current Phase)
- Real payment processing
- Real order fulfillment
- Medical claims, treatment guidance, or patient workflows
- Admin CMS/backoffice

## 4. Target Users
- Primary: Research buyers evaluating product options and quantities.
- Secondary: Internal stakeholders reviewing UX and architecture before production integration.

## 5. Core User Stories
- As a visitor, I can browse a catalog and view product details.
- As an authenticated user, I can add products to cart.
- As an authenticated user, I can choose one-time or subscription purchase options.
- As an authenticated user, I can adjust quantities and see pricing updates.
- As an authenticated user, I can complete a multi-step mock checkout and see success confirmation.

## 6. Functional Requirements
1. Authentication and Access
- Use Clerk for sign-in/sign-up.
- Cart mutation and checkout must require authentication.
- Unauthenticated mutation attempts route users to sign-in with redirect back to target flow.

2. Catalog and Product Detail
- Show product list with filtering/category support.
- Each product includes: title, short description, richer detail copy, pricing, image, and tags/category.
- Product detail page supports purchase type and cadence selection.

3. Cart
- Add, remove, and update quantity.
- Support separate lines for one-time vs subscription selections.
- Persist cart state by authenticated user key.
- Show subtotal, discount behavior (if applicable), and total.
- Expose cart status in global navigation and drawer/page views.

4. Checkout (Mock)
- Multi-step checkout: shipping, payment stub, order review.
- Place order action routes to success page.
- Success page explicitly states no real payment/fulfillment occurred.

5. Compliance and Messaging
- Reinforce research-use-only messaging on merchandising and checkout surfaces.
- Avoid medical efficacy claims.

## 7. Non-Functional Requirements
- Responsive UX for desktop and mobile.
- Accessible semantics for interactive controls (buttons, links, labels).
- Fast page interactions for cart and route transitions.
- Test coverage for core logic (cart math/reducer/storage, key route behavior).

## 8. Current Tech Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Clerk authentication
- Vitest + Testing Library

## 9. Success Metrics (Demo Phase)
- 95%+ successful completion of: sign in -> add to cart -> mock checkout.
- <2% critical cart logic test failures across CI runs.
- Zero blocking UX issues on catalog, cart, checkout flows in desktop/mobile smoke tests.

## 10. Milestones
1. Baseline Demo (Current)
- Catalog, product detail, auth-gated cart, mock checkout, success page.

2. Integration Readiness
- Replace local catalog with API-backed data.
- Add environment-driven pricing/inventory config.
- Introduce server-side order draft creation.

3. Production Commerce
- Real payment provider integration.
- Order management and fulfillment events.
- Confirmation emails and account order history.

## 11. Risks and Mitigations
- Risk: Users confuse demo checkout as real purchase flow.
- Mitigation: Persistent explicit mock/disclaimer copy across checkout and success.

- Risk: Cart logic regressions as pricing rules evolve.
- Mitigation: Maintain reducer/math unit tests and add scenario-based integration tests.

- Risk: Compliance ambiguity in product copy.
- Mitigation: Keep research-only language standards and content review checklist.

## 12. Open Questions
- Which backend platform will own catalog, pricing, and inventory?
- What subscription billing model is needed (fixed interval vs flexible cadence)?
- What legal/compliance review gates are required before production launch?
- Should guest carts be enabled prior to sign-in?

