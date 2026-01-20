import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from '../../utils/constants';

@Component({
  selector: 'top-nav-bar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.css',
})
export class TopNavBar {
  menuOpen = signal(false);
  brand = CONSTANTS.BRAND
  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
