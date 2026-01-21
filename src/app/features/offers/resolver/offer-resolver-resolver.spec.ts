import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RedirectCommand, Router } from '@angular/router';
import { firstValueFrom, from } from 'rxjs';

import { offerResolver } from './offer-resolver-resolver';
import { OffersService } from '../services/offers-service';
import { Offer } from '../models/offer';

describe('offerResolver', () => {
  let router: jasmine.SpyObj<Router>;
  let offersService: jasmine.SpyObj<OffersService>;

  const makeRoute = (id: string | null) =>
    ({
      paramMap: {
        get: (_key: string) => id,
      },
    } as unknown as ActivatedRouteSnapshot);

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['parseUrl']);
    router.parseUrl.and.callFake((url: string) => ({ url } as any));

    offersService = jasmine.createSpyObj<OffersService>('OffersService', ['getOfferById']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: OffersService, useValue: offersService },
      ],
    });
  });

  it('redirects to /not-found when id is missing', async () => {
    const route = makeRoute(null);

    const result$ = TestBed.runInInjectionContext(() => offerResolver(route, {} as any));
    const result = await firstValueFrom(result$);

    expect(result instanceof RedirectCommand).toBeTrue();
    expect(router.parseUrl).toHaveBeenCalledWith('/not-found');
  });

  it('redirects to /not-found when id is not a number', async () => {
    const route = makeRoute('abc');

    const result$ = TestBed.runInInjectionContext(() => offerResolver(route));
    const result = await firstValueFrom(result$);

    expect(result instanceof RedirectCommand).toBeTrue();
    expect(router.parseUrl).toHaveBeenCalledWith('/not-found');
  });

  it('redirects to /not-found when offer is not found', async () => {
    const route = makeRoute('103');

    // getOfferById returns a Signal<Offer | undefined>
    offersService.getOfferById.and.returnValue((() => undefined) as any);

    const result$ = TestBed.runInInjectionContext(() => offerResolver(route));
    const result = await firstValueFrom(result$);

    expect(result instanceof RedirectCommand).toBeTrue();
    expect(router.parseUrl).toHaveBeenCalledWith('/not-found');
    expect(offersService.getOfferById).toHaveBeenCalledWith(103);
  });

  it('returns offer when offer exists', async () => {
    const route = makeRoute('103');

    const mockOffer = { id: 103, title: 'Apple HomePod Mini' } as Offer;
    offersService.getOfferById.and.returnValue((() => mockOffer) as any);

    const result$ = TestBed.runInInjectionContext(() => offerResolver(route));
    const result = await firstValueFrom(result$);

    expect(result).toEqual(mockOffer);
    expect(offersService.getOfferById).toHaveBeenCalledWith(103);
  });
});
