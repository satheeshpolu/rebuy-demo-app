import { Component, inject, OnInit, signal } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { CommonModule } from '@angular/common';
import { OfferCard } from '../../components/shared/offer-card/offer-card';
import { Product } from '../../models/offer';
import { MatIconModule } from '@angular/material/icon';
import { CONSTANTS } from '../../utils/constants';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.html',
  styleUrls: ['./offers-list.css'],
  imports: [CommonModule, OfferCard, MatIconModule],
})
export class OffersList implements OnInit {
  readonly offersService = inject(OffersService);

  offers = this.offersService.offersSorted;
  data = signal<Product[]>([]);
  readonly CONSTANTS = CONSTANTS;

  ngOnInit(): void {
    // this.offersService.getProducts().subscribe((res) => {
    //   this.data.set(res.offers);
    //   console.log('Products response:', res.offers);
    //   this.offersService.loadProducts();
    // });
    // New code
    this.offersService.loadProducts();
    // console.log('Products response:', this.offers());
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
