import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Offer } from '../../models/offer';
import { OffersService } from '../../services/offers-service';

@Component({
  selector: 'offers-list',
  templateUrl: './offers-list.html',
  styleUrls: ['./offers-list.css'],
  imports: [RouterLink, CommonModule]
})
export class OffersList implements OnInit {
  offers$!: Observable<Offer[]>;

  constructor(private offersService: OffersService) {} //TODO: Replace it with injector

  ngOnInit(): void {
    this.offers$ = this.offersService.getOffers();
  }

  trackById(_: number, offer: Offer) {
    return offer.id;
  }
}
