import { Routes } from '@angular/router';
import { NotFound } from './features/offers/pages/not-found/not-found';

export const routes: Routes = [
  {
    path: 'offers',
    loadChildren: () => import('./features/offers/offers-module').then((m) => m.OffersModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'offers' },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: 'not-found' },
];
