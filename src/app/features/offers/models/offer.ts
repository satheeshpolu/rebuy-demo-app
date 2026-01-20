export type VoteValue = 'up' | 'down' | null;

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  validUntil: string;
  votes: number;
  voteType: VoteValue;
  discountPercentage: number;
  rating: number;
  stock: number;
  returnPolicy?: string;
  category: string;
  brand?: string;
  thumbnail: string;
  offer?: OfferInfo;
}

export type VoteType = 'up' | 'down' | null;

export interface OfferInfo {
  // “Offer” UI fields
  badge?: string; // e.g. "HOT", "NEW", "LIMITED"
  validUntil?: string; // ISO date string
  discountLabel?: string; // e.g. "11% OFF"
  shippingLabel?: string; // e.g. "Ships overnight"
  returnPolicy?: string; // e.g. "No return policy"
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  // voting
  votes: number;
  voteType: VoteType;
  offer?: OfferInfo;
}
