import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from '../../utils/constants';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'top-nav-bar',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.css',
})
export class TopNavBar {
  menuOpen = signal(false);
  readonly CONSTANTS = CONSTANTS;
  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
