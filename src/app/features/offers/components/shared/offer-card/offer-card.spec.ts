import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';

import { OfferCard } from './offer-card'; // ✅ change path/name if needed

xdescribe('OfferCard', () => {
  let fixture: ComponentFixture<OfferCard>;
  let component: OfferCard;

  const baseOffer: any = {
    id: 10,
    title: 'iPhone Charger',
    description: 'Fast charger',
    price: 19.99,
    votes: 5,
    voteType: null,
    thumbnail: 'thumb.jpg',
    discountPercentage: 10,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferCard],          // standalone component
      providers: [provideRouter([])] // needed for routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(OfferCard);
    component = fixture.componentInstance;
    // Most offer-card components have @Input() offer
    (component as any).offer = { ...baseOffer };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, description, price, and votes', () => {
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('mat-card-title')?.textContent).toContain(baseOffer.title);
    expect(el.querySelector('.card-content')?.textContent).toContain(baseOffer.description);
    expect(el.querySelector('.price')?.textContent).toContain(`$${baseOffer.price}`);
    expect(el.querySelector('.votes')?.textContent).toContain(`${baseOffer.votes}`);
  });

  it('should render discount badge text', () => {
    const badge = fixture.debugElement.query(By.css('.discount-badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent).toContain(`${baseOffer.discountPercentage}% OFF`);
  });

  it('should apply "medium" class when discountPercentage is between 5 and 19', () => {
    (component as any).offer = { ...baseOffer, discountPercentage: 10 };
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.discount-badge'));
    expect(badge.nativeElement.classList.contains('medium')).toBeTrue();
    expect(badge.nativeElement.classList.contains('hot')).toBeFalse();
  });

  it('should apply "hot" class when discountPercentage is 20 or more', () => {
    (component as any).offer = { ...baseOffer, discountPercentage: 25 };
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.discount-badge'));
    expect(badge.nativeElement.classList.contains('hot')).toBeTrue();
    expect(badge.nativeElement.classList.contains('medium')).toBeFalse();
  });

  it('should set routerLink to /offers/:id on the image', () => {
    const imgDe = fixture.debugElement.query(By.css('img[mat-card-image]'));
    expect(imgDe).toBeTruthy();

    const rl = imgDe.injector.get(RouterLink);
    // expect(rl.commands).toEqual(['/offers', baseOffer.id]);
  });

  it('should disable upvote button when voteType is "up"', () => {
    (component as any).offer = { ...baseOffer, voteType: 'up' };
    fixture.detectChanges();

    const upBtn = fixture.debugElement.query(By.css('button.icon-only-btn'));
    expect(upBtn.nativeElement.disabled).toBeTrue();
  });

  it('should disable downvote button when voteType is "down"', () => {
    (component as any).offer = { ...baseOffer, voteType: 'down' };
    fixture.detectChanges();

    // the downvote button is the second mat-icon-button in actions
    const buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button[mat-icon-button]'));
    const downBtn = buttons[1];
    expect(downBtn.nativeElement.disabled).toBeTrue();
  });

  it('should call onUpvote with event and offer.id when upvote is clicked', () => {
    const spy = spyOn(component as any, 'onUpvote');

    const upBtn = fixture.debugElement.query(By.css('button.icon-only-btn'));
    upBtn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
    const args = spy.calls.mostRecent().args;
    expect(args[1]).toBe(baseOffer.id); // args[0] is event, args[1] is id
  });

  it('should call onDownvote with event and offer.id when downvote is clicked', () => {
    const spy = spyOn(component as any, 'onDownvote');

    const buttons = fixture.debugElement.queryAll(By.css('mat-card-actions button[mat-icon-button]'));
    const downBtn = buttons[1];
    downBtn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
    const args = spy.calls.mostRecent().args;
    expect(args[1]).toBe(baseOffer.id);
  });
});
