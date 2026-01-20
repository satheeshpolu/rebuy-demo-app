import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Offer } from '../models/offer';

const OFFERS: Offer[] = [
  {
    id: 3,
    title: 'New User Special',
    description: 'Exclusive discount for new users.',
    price: 19.99,
    validUntil: '2026-03-31',
    votes: 42,
  },
  {
    id: 2,
    title: 'Bundle Pro Deal',
    description: 'Bundle and save more with our Pro plan.',
    price: 99.0,
    validUntil: '2026-12-31',
    votes: 128,
  },
  {
    id: 1,
    title: 'Summer Sale - 10% Off',
    description: 'Get 10% off on all summer items.',
    price: 49.99,
    validUntil: '2026-07-31',
    votes: 86,
  },
];

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  getOffers(): Observable<Offer[]> {
    return of([...OFFERS].sort((a, b) => b.votes - a.votes));
  }

  getOfferById(id: string): Observable<Offer | undefined> {
    return of(OFFERS.find((o) => o.id === parseInt(id)));
  }
}
