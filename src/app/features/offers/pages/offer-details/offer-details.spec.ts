import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

import { Offer } from '../../models/offer';
import { OfferDetails } from './offer-details';

xdescribe('OfferDetails', () => {
  let fixture: ComponentFixture<OfferDetails>;
  let component: OfferDetails;

  const routeData$ = new BehaviorSubject<any>({});
  const activatedRouteStub = {
    data: routeData$.asObservable(),
  } as Partial<ActivatedRoute>;

  let routerSpy: jasmine.SpyObj<Router>;

  const mockOffer: Offer = {
    id: 1,
    title: 'iPhone Charger',
    brand: 'Apple',
    category: 'electronics',
    description: 'Fast charger for iPhone',
    price: 19.99,
    rating: 4.6,
    availabilityStatus: 'In Stock',
    stock: 12,
    thumbnail: 'thumb.jpg',
    images: ['img-1.jpg', 'img-2.jpg'],
    tags: ['fast', 'usb-c'],
    discountPercentage: 15,
    shippingInformation: 'Free shipping',
    returnPolicy: '30 days return',
    warrantyInformation: '1 year',
    sku: 'SKU-123',
    minimumOrderQuantity: 1,
    weight: 0.2,
    dimensions: { width: 10, height: 5, depth: 2 } as any,
    reviews: [
      {
        reviewerName: 'Sam',
        rating: 5,
        date: '2026-01-01',
        comment: 'Great!',
      } as any,
    ],
  } as any;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [OfferDetails],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        // Needed because your component tree includes BackButton which uses routerLink
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferDetails);
    component = fixture.componentInstance;
  });

  function emitOffer(o: Offer) {
    routeData$.next({ offer: o });
    component.ngOnInit();
    fixture.detectChanges();
  }

  it('should create', () => {
    emitOffer(mockOffer);
    expect(component).toBeTruthy();
  });

  it('should render title, brand, category, and description', () => {
    emitOffer(mockOffer);

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.brand')?.textContent).toContain('Apple');
    expect(el.querySelector('.cat')?.textContent).toContain('ELECTRONICS'); // uppercase pipe
    expect(el.querySelector('h1.title')?.textContent).toContain('iPhone Charger');
    expect(el.querySelector('p.desc')?.textContent).toContain('Fast charger for iPhone');
  });

  it('should show discount badge when discountPercentage exists', () => {
    emitOffer(mockOffer);

    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain('15% OFF');
  });

  it('should set hero image to thumbnail initially', () => {
    emitOffer(mockOffer);

    const heroImg = fixture.debugElement.query(By.css('img.hero-img')).nativeElement as HTMLImageElement;
    expect(heroImg.src).toContain('thumb.jpg');
  });

  it('should render thumbnails and update hero image when a thumb is clicked', () => {
    emitOffer(mockOffer);

    const thumbs = fixture.debugElement.queryAll(By.css('.thumbs .thumb'));
    expect(thumbs.length).toBe(2);

    // Click the second thumbnail
    thumbs[1].nativeElement.click();
    fixture.detectChanges();

    const heroImg = fixture.debugElement.query(By.css('img.hero-img')).nativeElement as HTMLImageElement;
    expect(component.selectedImage).toBe('img-2.jpg');
    expect(heroImg.src).toContain('img-2.jpg');
  });

  it('should add "active" class to selected thumbnail', () => {
    emitOffer(mockOffer);

    const thumbsBefore = fixture.debugElement.queryAll(By.css('.thumbs .thumb'));
    thumbsBefore[0].nativeElement.click();
    fixture.detectChanges();

    const thumbsAfter = fixture.debugElement.queryAll(By.css('.thumbs .thumb'));
    expect(thumbsAfter[0].nativeElement.classList.contains('active')).toBeTrue();
    expect(thumbsAfter[1].nativeElement.classList.contains('active')).toBeFalse();
  });

  it('should navigate to /cart when "Add to cart" is clicked', () => {
    emitOffer(mockOffer);

    const addBtn = fixture.debugElement.query(By.css('button.btn.primary'));
    addBtn.nativeElement.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should navigate to /wishlist when "Wishlist" is clicked', () => {
    emitOffer(mockOffer);

    const wishBtn = fixture.debugElement.query(By.css('button.btn.ghost'));
    wishBtn.nativeElement.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/wishlist']);
  });

  it('should render reviews section when reviews exist', () => {
    emitOffer(mockOffer);

    const reviewsCard = fixture.debugElement.query(By.css('.detail-card.reviews'));
    expect(reviewsCard).toBeTruthy();

    const reviewName = fixture.debugElement.query(By.css('.review .name'));
    expect(reviewName.nativeElement.textContent).toContain('Sam');
  });

  it('should NOT render reviews section when no reviews exist', () => {
    emitOffer({ ...mockOffer, reviews: [] as any } as any);

    const reviewsCard = fixture.debugElement.query(By.css('.detail-card.reviews'));
    expect(reviewsCard).toBeNull();
  });
});
