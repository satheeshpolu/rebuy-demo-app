import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/offer';
import { MatIconModule } from '@angular/material/icon';
import { OffersService } from '../../../services/offers-service';

@Component({
  selector: 'offer-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './offer-card.html',
  styleUrls: ['./offer-card.css'],
})
export class OfferCard {
  @Input({ required: true }) offer!: Product;

  @Output() upvote = new EventEmitter<number>();
  @Output() downvote = new EventEmitter<number>();
  readonly offersService = inject(OffersService);

  stopEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onUpvote(event: Event, id: number) {
    console.log(this.offer)
    this.stopEvent(event);
    this.offersService.upvote(id);
    // this.upvote.emit(this.offer.id);
  }

  onDownvote(event: Event, id: number) {
    this.stopEvent(event);
    // this.downvote.emit(this.offer.id);
    this.offersService.downvote(id);

  }

  // get isUpvoted() {
  //   return this.offer.offer.voteType === 'up';
  // }

  // get isDownvoted() {
  //   return this.offer.offer.voteType === 'down';
  // }
}
