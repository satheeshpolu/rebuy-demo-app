// back-button.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

import { BackButton } from './back-button';

describe('BackButton', () => {
  let component: BackButton;
  let fixture: ComponentFixture<BackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // BackButton is standalone -> import it directly
      imports: [BackButton],
      // RouterLink needs router providers
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BackButton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title input', () => {
    component.title = 'Back to offers';
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Back to offers');
  });

  it('should render a mat-icon', () => {
    component.title = 'Back';
    fixture.detectChanges();

    const iconEl = fixture.debugElement.query(By.css('mat-icon'));
    expect(iconEl).toBeTruthy();
  });

  it('should expose CONSTANTS on the component', () => {
    expect(component.CONSTANTS).toBeTruthy();
  });
});
