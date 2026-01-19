import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OffersRoutingModule } from './offers-routing-module';
import { OfferDetail } from './pages/offer-details/offer-details';
import { OffersList } from './pages/offers-list/offers-list';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, OffersRoutingModule, OffersList, OfferDetail],
})
export class OffersModule {}
