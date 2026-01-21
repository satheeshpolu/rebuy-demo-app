import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Wishlist } from './wishlist'; // ✅ change to your actual component path/name
import { UnderConstruction } from '../../components/shared/under-construction/under-construction';

describe('Wishlist', () => {
  let fixture: ComponentFixture<Wishlist>;
  let component: Wishlist;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wishlist],            // standalone component
      providers: [provideRouter([])], // only needed if UnderConstruction -> BackButton uses routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(Wishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render UnderConstruction component', () => {
    const uc = fixture.debugElement.query(By.directive(UnderConstruction));
    expect(uc).toBeTruthy();
  });
});
