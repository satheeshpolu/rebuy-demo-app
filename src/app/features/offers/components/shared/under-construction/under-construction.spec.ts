import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { UnderConstruction } from './under-construction';
import { BackButton } from '../back-button/back-button';

describe('UnderConstruction', () => {
  let fixture: ComponentFixture<UnderConstruction>;
  let component: UnderConstruction;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderConstruction],     // standalone component
      providers: [provideRouter([])],   // needed if BackButton uses routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(UnderConstruction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the construction icon', () => {
    const iconDe = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconDe).toBeTruthy();
    expect(iconDe.nativeElement.textContent.trim()).toBe('construction');
  });

  it('should display the construction message', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Unser construction');
  });

  it('should render the BackButton component', () => {
    const backButtonDe = fixture.debugElement.query(By.directive(BackButton));
    expect(backButtonDe).toBeTruthy();
  });

  it('should pass correct title to BackButton', () => {
    const backButtonDe = fixture.debugElement.query(By.directive(BackButton));
    const backButtonInstance = backButtonDe.componentInstance as BackButton;

    expect(backButtonInstance.title).toBe('Back to Offers');
  });
});
