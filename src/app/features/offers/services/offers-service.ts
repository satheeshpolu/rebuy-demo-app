import { Injectable, signal, computed, inject } from '@angular/core';
import { Offer } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

const OFFERS: Offer[] = [
  {
    id: 2,
    title: 'Bundle Pro Deal',
    description: 'Bundle and save more with our Pro plan.',
    price: 99.0,
    validUntil: '2026-12-31',
    votes: 128,
    voteType: null,
  },
  {
    id: 4,
    title: 'New User Special',
    description: 'Exclusive discount for new users.',
    price: 19.99,
    validUntil: '2026-03-31',
    votes: 10,
    voteType: null,
  },
  {
    id: 1,
    title: 'Summer Sale - 10% Off',
    description: 'Get 10% off on all summer items.',
    price: 49.99,
    validUntil: '2026-07-31',
    votes: 86,
    voteType: null,
  },
  {
    id: 3,
    title: 'New User Special',
    description: 'Exclusive discount for new users.',
    price: 19.99,
    validUntil: '2026-03-31',
    votes: 42,
    voteType: null,
  },
];

export interface ProductsResponse {
  total: number;
  skip: number;
  limit: number;
  offers: any[];
}

@Injectable({ providedIn: 'root' })
export class OffersService {
  // source of truth
  private http = inject(HttpClient);
  private readonly _offers = signal<Offer[]>(OFFERS);

  // derived state (always sorted by votes desc)
  readonly offersSorted = computed(() => [...this._offers()].sort((a, b) => b.votes - a.votes));

  // actions
  upvote(id: number) {
    this._offers.update((list) =>
      list.map((o) => (o.id === id ? { ...o, votes: o.votes + 1, voteType: 'up' } : o)),
    );
  }

  downvote(id: number) {
    this._offers.update((list) =>
      list.map((o) =>
        o.id === id ? { ...o, votes: Math.max(0, o.votes - 1), voteType: 'down' } : o,
      ),
    );
  }

  getOfferById(id: number) {
    return computed(() => this._offers().find((o) => o.id === id));
  }

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>('assets/mock-data/offers-data.json').pipe(
      tap((res) => {
        // TODO: set the offers here
        // this.chocolates.set(res.data);
        // this.loading.set(false);
      }),
      catchError((err) => {
        console.error('Failed to load mock products', err);
        return throwError(() => err);
      }),
    );
  }
}
