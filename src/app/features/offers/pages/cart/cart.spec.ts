import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { UnderConstruction } from '../../components/shared/under-construction/under-construction';
import { Cart } from './cart';

describe('Cart', () => {
  let fixture: ComponentFixture<Cart>;
  let component: Cart;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart], // standalone component
      providers: [provideRouter([])], // only needed if UnderConstruction -> BackButton uses routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
