import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersList } from './pages/offers-list/offers-list';
import { OfferDetail } from './pages/offer-details/offer-details';
import { offerResolver } from './resolver/offer-resolver-resolver';

const routes: Routes = [
  { path: '', component: OffersList },
  { path: ':id', component: OfferDetail, resolve: { offer: offerResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
