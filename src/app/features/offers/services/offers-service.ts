import { Injectable, signal, computed, inject } from '@angular/core';
import { Offer, VoteType } from '../models/offer';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay, tap } from 'rxjs';

type OffersResponse = { offers: Offer[] };

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
  private load$?: Observable<Offer[]>;
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

  ensureLoaded(): Observable<Offer[]> {
    if (this._offers().length) {
      return new Observable<Offer[]>((sub) => {
        sub.next(this._offers());
        sub.complete();
      });
    }

    if (!this.load$) {
      this.load$ = this.http.get<OffersResponse>('assets/mock-data/offers-data.json').pipe(
        map((res) => res.offers ?? []),
        tap((offers) => this._offers.set(offers)),
        shareReplay(1),
      );
    }

    return this.load$;
  }

  getOfferByIdFromCache(id: number): Offer | undefined {
    return this._offers().find((o) => o.id === id);
  }
}
