// import { TestBed } from '@angular/core/testing';
// import { ActivatedRouteSnapshot, Router, RedirectCommand } from '@angular/router';
// import { signal } from '@angular/core';

// import { offerResolver } from './offer-resolver-resolver';
// import { OffersService } from '../services/offers-service';
// import { Offer } from '../models/offer';

// describe('offerResolver', () => {
//   let routerSpy: jasmine.SpyObj<Router>;
//   let offersServiceSpy: jasmine.SpyObj<OffersService>;

//   function createRouteSnapshot(id: string | null): ActivatedRouteSnapshot {
//     return {
//       paramMap: {
//         get: () => id,
//       },
//     } as unknown as ActivatedRouteSnapshot;
//   }

//   beforeEach(() => {
//     routerSpy = jasmine.createSpyObj<Router>('Router', ['parseUrl']);
//     routerSpy.parseUrl.and.callFake((url: string) => url as any);

//     offersServiceSpy = jasmine.createSpyObj<OffersService>('OffersService', [
//       'getOfferById',
//     ]);

//     TestBed.configureTestingModule({
//       providers: [
//         { provide: Router, useValue: routerSpy },
//         { provide: OffersService, useValue: offersServiceSpy },
//       ],
//     });
//   });

//   it('should redirect to /not-found when id param is missing', () => {
//     const route = createRouteSnapshot(null);

//     const result = TestBed.runInInjectionContext(() =>
//       offerResolver(route)
//     );

//     expect(result instanceof RedirectCommand).toBeTrue();
//     expect(routerSpy.parseUrl).toHaveBeenCalledWith('/not-found');
//   });

//   it('should redirect to /not-found when id is not a number', () => {
//     const route = createRouteSnapshot('abc');

//     const result = TestBed.runInInjectionContext(() =>
//       offerResolver(route)
//     );

//     expect(result instanceof RedirectCommand).toBeTrue();
//     expect(routerSpy.parseUrl).toHaveBeenCalledWith('/not-found');
//   });

//   it('should redirect to /not-found when offer does not exist', () => {
//     offersServiceSpy.getOfferById.and.returnValue(signal(undefined));

//     const route = createRouteSnapshot('123');

//     const result = TestBed.runInInjectionContext(() =>
//       offerResolver(route)
//     );

//     expect(offersServiceSpy.getOfferById).toHaveBeenCalledWith(123);
//     expect(result instanceof RedirectCommand).toBeTrue();
//     expect(routerSpy.parseUrl).toHaveBeenCalledWith('/not-found');
//   });

//   it('should return the offer when a valid offer exists', () => {
//     const mockOffer: Offer = {
//       id: 1,
//       title: 'iPhone Charger',
//       brand: 'Apple',
//       price: 19.99,
//       description: 'Fast charger',
//       thumbnail: 'img.jpg',
//     } as Offer;

//     offersServiceSpy.getOfferById.and.returnValue(signal(mockOffer));

//     const route = createRouteSnapshot('1');

//     const result = TestBed.runInInjectionContext(() =>
//       offerResolver(route)
//     );

//     expect(offersServiceSpy.getOfferById).toHaveBeenCalledWith(1);
//     expect(result).toEqual(mockOffer);
//   });
// });
