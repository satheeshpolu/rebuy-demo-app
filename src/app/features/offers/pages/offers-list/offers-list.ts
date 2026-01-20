import { Component, inject } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.html',
  styleUrls: ['./offers-list.css'],
  imports: [RouterLink, CommonModule],
})
export class OffersList {
  private readonly offersService = inject(OffersService);

  offers = this.offersService.offersSorted;

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
