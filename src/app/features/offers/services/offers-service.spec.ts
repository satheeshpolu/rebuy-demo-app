import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OffersService } from './offers-service';
import { Offer } from '../models/offer';

describe('OffersService', () => {
  let service: OffersService;
  let httpMock: HttpTestingController;

  const mockOffers: Offer[] = [
    {
      id: 1,
      title: 'A',
      description: 'desc',
      price: 10,
      thumbnail: 'a.jpg',
      votes: 2,
      voteType: null,
      discountPercentage: 10,
    } as any,
    {
      id: 2,
      title: 'B',
      description: 'desc',
      price: 20,
      thumbnail: 'b.jpg',
      votes: 5,
      voteType: null,
      discountPercentage: 25,
    } as any,
    {
      id: 3,
      title: 'C',
      description: 'desc',
      price: 30,
      thumbnail: 'c.jpg',
      votes: 1,
      voteType: null,
      discountPercentage: 3,
    } as any,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OffersService],
    });

    service = TestBed.inject(OffersService);
    httpMock = TestBed.inject(HttpTestingController);

    // Seed initial state via the public loadProducts() path OR directly via a flush.
    // We'll set initial offers by calling loadProducts and flushing.
    service.loadProducts();
    const req = httpMock.expectOne('assets/mock-data/offers-data.json');
    req.flush({ offers: mockOffers });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose offers signal with loaded offers', () => {
    expect(service.offers().length).toBe(3);
    expect(service.offers().map(o => o.id)).toEqual([1, 2, 3]);
  });

  it('upvote should increment votes and set voteType=up', () => {
    service.upvote(1);

    const updated = service.offers().find(o => o.id === 1)!;
    expect(updated.votes).toBe(3);
    expect(updated.voteType).toBe('up');
  });

  it('downvote should decrement votes and set voteType=down', () => {
    service.downvote(2);

    const updated = service.offers().find(o => o.id === 2)!;
    expect(updated.votes).toBe(4);
    expect(updated.voteType).toBe('down');
  });

  it('downvote should not go below 0', () => {
    // offer id=3 has votes=1; downvote twice
    service.downvote(3);
    service.downvote(3);

    const updated = service.offers().find(o => o.id === 3)!;
    expect(updated.votes).toBe(0);
    expect(updated.voteType).toBe('down');
  });

  it('offersSorted should be sorted by votes desc', () => {
    const sorted = service.offersSorted();
    expect(sorted.map(o => o.id)).toEqual([2, 1, 3]); // votes: 5,2,1
  });

  it('getOfferById should return a computed signal that updates with state', () => {
    const offerSig = service.getOfferById(1);

    expect(offerSig()?.id).toBe(1);
    expect(offerSig()?.votes).toBe(2);

    service.upvote(1);
    expect(offerSig()?.votes).toBe(3); // computed updates
  });

  it('loadProducts should GET offers-data.json and set offers', () => {
    // Clear state by creating a fresh service instance to isolate this test
    const freshService = TestBed.inject(OffersService);
    freshService.loadProducts();

    const req = httpMock.expectOne('assets/mock-data/offers-data.json');
    expect(req.request.method).toBe('GET');

    req.flush({ offers: mockOffers });

    expect(freshService.offers().length).toBe(3);
    expect(freshService.offers()[0].id).toBe(1);
  });

  it('getProducts should map offers into products[] with offer metadata', (done) => {
    const apiResponse = {
      offers: [
        {
          id: 10,
          title: 'Prod',
          description: 'Desc',
          price: 99,
          thumbnail: 'x.jpg',
          discountPercentage: 20,
          shippingInformation: 'Free shipping',
          returnPolicy: '30 days',
          meta: { updatedAt: '2026-01-21' },
        },
      ],
      total: 1,
    };

    service.getProducts().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.products).toBeTruthy();
      expect(Array.isArray(res.products)).toBeTrue();
      expect(res.products.length).toBe(1);

      const p = res.products[0];
      expect(p.id).toBe(10);
      expect(p.offer).toBeTruthy();

      // badge logic
      expect(p.offer.badge).toBe('HOT'); // discountPercentage >= 15
      // mapped labels
      expect(p.offer.discountLabel).toBe('20% OFF');
      expect(p.offer.shippingLabel).toBe('Free shipping');
      expect(p.offer.returnPolicy).toBe('30 days');
      expect(p.offer.validUntil).toBe('2026-01-21');

      // votes is random; just assert it exists and is a number
      expect(typeof p.offer.votes).toBe('number');
      expect(p.offer.voteType).toBeNull();

      done();
    });

    const req = httpMock.expectOne('assets/mock-data/offers-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(apiResponse);
  });
});
