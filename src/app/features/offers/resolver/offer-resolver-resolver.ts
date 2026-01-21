import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, map, take, tap } from 'rxjs';
import { OffersService } from '../services/offers-service';
import { Offer } from '../models/offer';

export const offerResolver: ResolveFn<Offer> = (route: ActivatedRouteSnapshot) => {
  const offersService = inject(OffersService);
  const router = inject(Router);

  const idParam = route.paramMap.get('id') ?? '';
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id)) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return offersService.ensureLoaded().pipe(
    take(1),
    map(() => offersService.getOfferByIdFromCache(id)),
    tap((offer) => {
      if (!offer) router.navigateByUrl('/not-found');
    }),
    map((offer) => offer as Offer),
  );
};
