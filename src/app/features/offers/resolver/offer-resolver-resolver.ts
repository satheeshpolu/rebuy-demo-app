import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Offer } from '../models/offer';
import { OffersService } from '../services/offers-service';

export const offerResolver: ResolveFn<Offer> = (route: ActivatedRouteSnapshot) => {
  const offersService = inject(OffersService);
  const router = inject(Router);

  const idParam = route.paramMap.get('id') ?? '';

  const rediretToNotFound = () => {
    router.navigateByUrl('/not-found');
    return EMPTY;
  };

  if (!idParam) {
    rediretToNotFound();
  }

  const id = Number(idParam);
  if (Number.isNaN(id)) {
    rediretToNotFound();
  }

  return offersService.getOfferById(idParam).pipe(
    take(1),
    tap((offer) => {
      if (!offer) {
        router.navigateByUrl('/not-found');
      }
    }),
    map((offer) => offer as Offer),
  );
};
