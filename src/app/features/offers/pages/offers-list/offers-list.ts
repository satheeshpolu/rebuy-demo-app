import { Component, inject } from '@angular/core';
import { OffersService } from '../../services/offers-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offer';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.html',
  styleUrls: ['./offers-list.css'],
  imports: [RouterLink, CommonModule]
})
export class OffersList {
  // offers$!: Observable<Offer[]>;
  // signal (computed) exposed from service
private readonly offersService = inject(OffersService);

  offers = this.offersService.offersSorted;

  upvote(id: number) {
    this.offersService.upvote(id);
  }

  downvote(id: number) {
    this.offersService.downvote(id);
  }

  trackById = (_: number, offer: { id: number }) => offer.id;
}
