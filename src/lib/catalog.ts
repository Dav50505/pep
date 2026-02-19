export type SubscriptionCadence = '2_weeks' | '4_weeks' | '8_weeks';
export type PurchaseType = 'one_time' | 'subscription';

export type ProductCategory = 'recovery' | 'growth' | 'metabolic' | 'focus';

export interface CatalogProduct {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  priceUsd: number;
  volumeMl: number;
  concentration: string;
  category: ProductCategory;
  tags: string[];
  imagePath: string;
  badge: string;
  inStock: boolean;
  subscriptionDiscountPct: number;
}

export interface CartLine {
  lineId: string;
  productSlug: string;
  quantity: number;
  purchaseType: PurchaseType;
  cadence: SubscriptionCadence;
  unitPriceUsd: number;
  unitVolumeMl: number;
}

export interface CartState {
  lines: CartLine[];
  isDrawerOpen: boolean;
  lastUpdatedAt: string;
}

export interface CartSummary {
  itemCount: number;
  vialCount: number;
  totalVolumeMl: number;
  oneTimeSubtotalUsd: number;
  subscriptionSubtotalUsd: number;
  savingsUsd: number;
  orderTotalUsd: number;
}

export const SUBSCRIPTION_CADENCES: Record<SubscriptionCadence, string> = {
  '2_weeks': 'Every 2 weeks',
  '4_weeks': 'Every 4 weeks',
  '8_weeks': 'Every 8 weeks',
};

export const products: CatalogProduct[] = [
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    shortDescription: 'Regenerative support peptide for soft tissue research programs.',
    longDescription:
      'BPC-157 is a synthetic peptide fragment widely used in preclinical protocols focused on connective tissue signaling and gastrointestinal resilience pathways. Each vial is manufactured for consistent lot-to-lot quality and validated purity documentation.',
    priceUsd: 64,
    volumeMl: 3,
    concentration: '10mg / 3mL',
    category: 'recovery',
    tags: ['Recovery', 'Tissue Repair', 'Research Grade'],
    imagePath: '/images/products/ABM-SC-BPC157-10.webp',
    badge: 'Best Seller',
    inStock: true,
    subscriptionDiscountPct: 12,
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    shortDescription: 'Thymosin beta-4 analog for mobility and inflammation studies.',
    longDescription:
      'TB-500 is used in exploratory research centered on tissue remodeling and angiogenic response. Formulated as a high-purity lyophilized vial with standardized concentration and strict cold-chain handling guidance.',
    priceUsd: 72,
    volumeMl: 3,
    concentration: '10mg / 3mL',
    category: 'recovery',
    tags: ['Mobility', 'Recovery', 'Inflammation Research'],
    imagePath: '/images/products/ABM-SC-TB500-10.webp',
    badge: 'Lab Favorite',
    inStock: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    shortDescription: 'Selective GH secretagogue for endocrine pathway analysis.',
    longDescription:
      'Ipamorelin is a pentapeptide used in growth hormone release models and circadian research protocols. This format provides clear concentration labeling and consistent reconstitution guidance for controlled studies.',
    priceUsd: 58,
    volumeMl: 2,
    concentration: '5mg / 2mL',
    category: 'growth',
    tags: ['GH Axis', 'Sleep Research', 'Peptide Protocols'],
    imagePath: '/images/products/ABM-SC-2XB-102_0125cf6f-74a2-4609-b148-ea631d134215.webp',
    badge: 'Precision Series',
    inStock: true,
    subscriptionDiscountPct: 12,
  },
  {
    slug: 'cjc-1295',
    name: 'CJC-1295',
    shortDescription: 'Long-acting GHRH analog for pulsatile release investigations.',
    longDescription:
      'CJC-1295 is commonly paired in advanced endocrine studies examining pituitary response over longer timelines. Produced with enhanced quality controls suitable for repeatable protocol design.',
    priceUsd: 66,
    volumeMl: 2,
    concentration: '5mg / 2mL',
    category: 'growth',
    tags: ['Growth Signaling', 'Protocol Stack', 'Long Acting'],
    imagePath: '/images/products/ABM-SC-CJC-NODAC-10.webp',
    badge: 'Advanced Stack',
    inStock: true,
    subscriptionDiscountPct: 14,
  },
  {
    slug: 'retatrutide',
    name: 'Retatrutide',
    shortDescription: 'Multi-agonist candidate for metabolic pathway exploration.',
    longDescription:
      'Retatrutide is a triple agonist peptide candidate investigated in metabolic signaling models. This placeholder product page showcases a premium presentation for modern catalog expansion.',
    priceUsd: 89,
    volumeMl: 3,
    concentration: '15mg / 3mL',
    category: 'metabolic',
    tags: ['Metabolic', 'GLP Research', 'Next Gen'],
    imagePath: '/images/products/Retatrutide.jpg',
    badge: 'New Arrival',
    inStock: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'selank',
    name: 'Selank',
    shortDescription: 'Nootropic peptide format for cognition and stress-response research.',
    longDescription:
      'Selank is included as a focus-pathway peptide option for labs studying cognition, stress modulation, and behavioral signaling. Packaging and visual identity align with a premium clinical storefront experience.',
    priceUsd: 54,
    volumeMl: 2,
    concentration: '5mg / 2mL',
    category: 'focus',
    tags: ['Cognition', 'Focus', 'Stress Models'],
    imagePath: '/images/products/ABM-SC-SELANK-5.webp',
    badge: 'Specialty',
    inStock: false,
    subscriptionDiscountPct: 8,
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  recovery: 'Recovery',
  growth: 'Growth',
  metabolic: 'Metabolic',
  focus: 'Focus',
};

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCadenceLabel(cadence: SubscriptionCadence): string {
  return SUBSCRIPTION_CADENCES[cadence];
}
