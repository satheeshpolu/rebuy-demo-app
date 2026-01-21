import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart-service';
import { DiscountPrice } from '../../components/shared/discount-price/discount-price';
import { CONSTANTS } from '../../utils/constants';
import { EmptyState } from '../../components/shared/empty-state/empty-state';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, MatIconModule, DiscountPrice, EmptyState],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartPage {
  readonly cart = inject(CartService);
  private readonly router = inject(Router);

  items = this.cart.items;
  count = this.cart.count;
  subtotal = this.cart.subtotal;

  shipping = computed(() => (this.subtotal() >= 50 ? 0 : 4.99));
  total = computed(() => this.subtotal() + this.shipping());
  readonly CONSTANTS = CONSTANTS;
  inc(id: number) {
    const item = this.items().find((x) => x.id === id);
    if (!item) return;
    this.cart.setQuantity(id, item.quantity + 1);
  }

  dec(id: number) {
    const item = this.items().find((x) => x.id === id);
    if (!item) return;
    this.cart.setQuantity(id, Math.max(1, item.quantity - 1));
  }

  remove(id: number) {
    this.cart.remove(id);
  }

  clear() {
    this.cart.clear();
  }
  checkout() {
    this.router.navigate(['/check-out']);
  }
}
