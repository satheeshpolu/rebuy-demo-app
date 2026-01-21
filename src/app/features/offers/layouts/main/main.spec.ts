import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Main } from './main'; // ✅ change to your actual component path/name
import { TopNavBar } from '../top-nav-bar/top-nav-bar'; // ✅ adjust path

describe('Main', () => {
  let fixture: ComponentFixture<Main>;
  let component: Main;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Main],              // standalone component
      providers: [provideRouter([])] // needed if TopNavBar uses routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render TopNavBar component', () => {
    const nav = fixture.debugElement.query(By.directive(TopNavBar));
    expect(nav).toBeTruthy();
  });
});
