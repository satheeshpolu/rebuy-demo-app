import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, Router, RedirectCommand } from '@angular/router';
import { Offer } from '../models/offer';
import { OffersService } from '../services/offers-service';

export const offerResolver: ResolveFn<Offer> = (route: ActivatedRouteSnapshot) => {
 const offersService = inject(OffersService);
  const router = inject(Router);

  const idParam = route.paramMap.get('id');
  if (!idParam) return new RedirectCommand(router.parseUrl('/not-found'));

  const id = Number(idParam);
  if (!Number.isFinite(id)) return new RedirectCommand(router.parseUrl('/not-found'));

  const offerSig = offersService.getOfferById(id); // Signal<Offer | undefined>
  const offer = offerSig(); // read current value

  return offer ? offer : new RedirectCommand(router.parseUrl('/not-found'));
};
