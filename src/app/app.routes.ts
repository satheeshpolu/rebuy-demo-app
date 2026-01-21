import { Routes } from '@angular/router';
import { NotFound } from './features/offers/pages/not-found/not-found';
import { CheckOut } from './features/offers/pages/check-out/check-out';

export const routes: Routes = [
  {
    path: 'offers',
    loadChildren: () => import('./features/offers/offers-module').then((m) => m.OffersModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'offers' },
  { path: 'not-found', component: NotFound },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/offers/pages/wishlist/wishlist').then((m) => m.WishlistPage),
  },

  {
    path: 'cart',
    loadComponent: () => import('./features/offers/pages/cart/cart').then((m) => m.CartPage),
  },
  { path: 'check-out', component: CheckOut },
  { path: '**', redirectTo: 'not-found' },
];
