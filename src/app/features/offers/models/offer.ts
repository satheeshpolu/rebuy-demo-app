export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  validUntil: string; // ISO date string
  votes: number;
}
