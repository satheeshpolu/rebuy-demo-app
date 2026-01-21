import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from '../../utils/constants';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'top-nav-bar',
  imports: [RouterLink, MatIconModule, MatButtonModule, CommonModule],
  standalone: true,
  templateUrl: './top-nav-bar.html',
  styleUrl: './top-nav-bar.css',
})
export class TopNavBar {
  private readonly cart = inject(CartService);

  menuOpen = signal(false);
  readonly CONSTANTS = CONSTANTS;
  cartCount = this.cart.count;
  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
}
