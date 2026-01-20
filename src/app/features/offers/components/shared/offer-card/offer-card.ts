import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/offer';

@Component({
  selector: 'offer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offer-card.html',
  styleUrls: ['./offer-card.css'],
})
export class OfferCard {
  @Input({ required: true }) offer!: Product;

  @Output() upvote = new EventEmitter<number>();
  @Output() downvote = new EventEmitter<number>();

  stopEvent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onUpvote(event: Event) {
    console.log(this.offer)
    this.stopEvent(event);
    this.upvote.emit(this.offer.id);
  }

  onDownvote(event: Event) {
    this.stopEvent(event);
    this.downvote.emit(this.offer.id);
  }

  get isUpvoted() {
    return this.offer.offer.voteType === 'up';
  }

  get isDownvoted() {
    return this.offer.offer.voteType === 'down';
  }
}
