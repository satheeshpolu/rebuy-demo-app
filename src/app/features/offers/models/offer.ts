export type VoteValue = 'up' | 'down' | null;

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  validUntil: string;
  votes: number;
  voteType: VoteValue;
}
