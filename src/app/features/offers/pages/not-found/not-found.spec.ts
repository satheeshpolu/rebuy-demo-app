import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { NotFound } from './not-found'; // ✅ change path/name if needed
import { BackButton } from '../../components/shared/back-button/back-button'; // ✅ change path if needed

describe('NotFound', () => {
  let fixture: ComponentFixture<NotFound>;
  let component: NotFound;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFound],          // standalone component
      providers: [provideRouter([])] // only needed if BackButton uses routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(NotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 404 heading', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent.trim()).toBe('404');
  });

  it('should render "Page not found."', () => {
    const p = fixture.debugElement.query(By.css('p'));
    expect(p).toBeTruthy();
    expect(p.nativeElement.textContent.trim()).toBe('Page not found.');
  });

  it('should render BackButton component', () => {
    const backBtnDe = fixture.debugElement.query(By.directive(BackButton));
    expect(backBtnDe).toBeTruthy();
  });

  it('should pass title input to BackButton', () => {
    const backBtnDe = fixture.debugElement.query(By.directive(BackButton));
    const backBtnInstance = backBtnDe.componentInstance as BackButton;

    expect(backBtnInstance.title).toBe('Go to offers');
  });
});
