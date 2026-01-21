import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DiscountPrice } from './discount-price';

describe('DiscountPrice', () => {
  let fixture: ComponentFixture<DiscountPrice>;
  let component: DiscountPrice;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountPrice], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountPrice);
    component = fixture.componentInstance;

    // Default inputs
    component.currencySymbol = '€';
    component.showChip = true;
  });

  it('should create', () => {
    component.price = 100;
    component.discountPercentage = 0;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should NOT render original price and chip when there is no discount', () => {
    component.price = 100;
    component.discountPercentage = 0;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.original'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.chip'))).toBeNull();
  });

  it('should NOT render chip when showChip=false even if there is a discount', () => {
    fixture.componentRef.setInput('currencySymbol', '€');
    fixture.componentRef.setInput('price', 100);
    fixture.componentRef.setInput('discountPercentage', 15);
    fixture.componentRef.setInput('showChip', false);

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.chip'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.original'))).toBeTruthy(); // original still shown
  });
});
