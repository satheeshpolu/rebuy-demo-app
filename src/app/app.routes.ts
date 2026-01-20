import { Routes } from '@angular/router';
import { NotFound } from './features/offers/pages/not-found/not-found';
import { Wishlist } from './features/offers/pages/wishlist/wishlist';
import { Cart } from './features/offers/pages/cart/cart';

export const routes: Routes = [
  {
    path: 'offers',
    loadChildren: () => import('./features/offers/offers-module').then((m) => m.OffersModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'offers' },
  // { path: 'not-found', component: NotFound },
  { path: 'wishlist', component: Wishlist },
  { path: 'cart', component: Cart },
  { path: '**', redirectTo: 'not-found' },
];
