import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';

import { TopNavBar } from './top-nav-bar'; // ✅ adjust path/name

describe('TopNavBar', () => {
  let fixture: ComponentFixture<TopNavBar>;
  let component: TopNavBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavBar], // standalone component
      providers: [provideRouter([])], // needed for routerLink / routerLinkActive directives
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavBar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have routerLink="/" on the logo', () => {
    (component as any).brand = 'Smartbuy';
    fixture.detectChanges();

    const logoLinkDe = fixture.debugElement.query(By.css('.logo a'));
    const rl = logoLinkDe.injector.get(RouterLink);
    expect(rl).toBeTruthy();
    // expect(rl.commands).toEqual(['/']);
  });

  it('should call toggleMenu() when hamburger is clicked', () => {
    fixture.detectChanges();

    const spy = spyOn(component as any, 'toggleMenu');
    const btn = fixture.debugElement.query(By.css('button.hamburger'));
    btn.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should add "open" class when menuOpen() returns true', () => {
    // Force menuOpen() to return true (works whether menuOpen is a method or signal accessor)
    (component as any).menuOpen = () => true;
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('nav.nav-links'));
    expect(nav.nativeElement.classList.contains('open')).toBeTrue();
  });

  it('should NOT have "open" class when menuOpen() returns false', () => {
    (component as any).menuOpen = () => false;
    fixture.detectChanges();

    const nav = fixture.debugElement.query(By.css('nav.nav-links'));
    expect(nav.nativeElement.classList.contains('open')).toBeFalse();
  });
});
