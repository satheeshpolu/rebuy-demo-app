import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';

import { OffersList } from './offers-list'; // ✅ adjust path/name
import { OffersService } from '../../services/offers-service'; // ✅ adjust path

xdescribe('OffersList', () => {
  let fixture: ComponentFixture<OffersList>;
  let component: OffersList;

  // controllable mock signal
  const offersSig = signal<any[]>([]);

  const offersServiceMock = {
    offers: offersSig.asReadonly(),
  } as Partial<OffersService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffersList], // standalone component
      providers: [{ provide: OffersService, useValue: offersServiceMock }],
      schemas: [NO_ERRORS_SCHEMA], // ignore <offer-card>
    }).compileComponents();

    fixture = TestBed.createComponent(OffersList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render heading "Offers"', () => {
    offersSig.set([{ id: 1 }, { id: 2 }]);
    fixture.detectChanges();

    const h1 = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(h1).toBeTruthy();
    expect(h1.textContent?.trim()).toBe('Offers');
  });

  it('should render one offer-card per offer', () => {
    offersSig.set([{ id: 1 }, { id: 2 }, { id: 3 }]);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('offer-card');
    expect(cards.length).toBe(3);
  });

  it('should render 0 offer-cards when offers() is empty', () => {
    offersSig.set([]);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('offer-card');
    expect(cards.length).toBe(0);
  });
});
