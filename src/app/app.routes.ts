import { Routes } from '@angular/router';
import { NotFound } from './features/offers/pages/not-found/not-found';
import { confirmCheckoutGuard } from './features/offers/guards/confirm-checkout-guard';

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
      import('./features/offers/pages/wishlist/wishlist').then((m) => m.Wishlist),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/offers/pages/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'check-out',
    loadComponent: () =>
      import('./features/offers/pages/check-out/check-out').then((m) => m.CheckOut),
    canActivate: [confirmCheckoutGuard],
  },
  { path: '**', redirectTo: 'not-found' },
];
