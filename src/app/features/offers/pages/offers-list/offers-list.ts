import { Component, inject, OnInit, signal } from '@angular/core';
import { OffersService, ProductsResponse } from '../../services/offers-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OfferCard } from '../../components/shared/offer-card/offer-card';
import { Product } from '../../models/offer';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.html',
  styleUrls: ['./offers-list.css'],
  imports: [RouterLink, CommonModule, OfferCard],
})
export class OffersList implements OnInit {
  readonly offersService = inject(OffersService);

  offers = this.offersService.offersSorted;
  // data = signal<ProductsResponse | null>(null);
    data = signal<Product[]>([]);
  ngOnInit(): void {
    this.offersService.getProducts().subscribe(res => {
    this.data.set(res.offers);
    console.log('Products response:', res.offers);
  });
  }
  
  private stopEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  upvote(event: Event, id: number) {
    this.stopEvent(event);
    this.offersService.upvote(id);
  }

  downvote(event: Event, id: number) {
    this.stopEvent(event);
    this.offersService.downvote(id);
  }

  trackById = (_: number, offer: { id: number }) => offer.id;
}
