import { Injectable, signal, computed, inject } from '@angular/core';
import { Offer, Product, VoteType } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OffersService {
  // source of truth
  private http = inject(HttpClient);
  // private readonly _offers = signal<Offer[]>(OFFERS);

  // derived state (always sorted by votes desc)
  readonly offersSorted = computed(() => [...this._offers()].sort((a, b) => b.votes - a.votes));

  // New code
  private readonly _offers = signal<Offer[]>([]);
  readonly offers = this._offers.asReadonly();
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
  loadProducts(): void {
    this.http.get<any>('assets/mock-data/offers-data.json').subscribe((res) => {
      this._offers.set(res.offers);
    });
  }

  getProducts() {
    return this.http.get<any>('assets/mock-data/offers-data.json').pipe(
      map((res) => ({
        ...res,
        products: res.offers.map((p: any) => ({
          ...p,
          offer: {
            badge: p.discountPercentage >= 15 ? 'HOT' : 'DEAL',
            validUntil: p?.meta?.updatedAt, // you can change this
            discountLabel: `${Math.round(p.discountPercentage)}% OFF`,
            shippingLabel: p.shippingInformation,
            returnPolicy: p.returnPolicy,
            votes: Math.floor(Math.random() * 500),
            voteType: null as VoteType,
          },
        })) as Offer[],
      })),
    );
  }
}
