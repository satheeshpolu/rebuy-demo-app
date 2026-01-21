import { Component, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart-service';
import { DiscountPrice } from '../../components/shared/discount-price/discount-price';

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, MatIconModule, DiscountPrice],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartPage {
  readonly cart = inject(CartService);

  items = this.cart.items;
  count = this.cart.count;
  subtotal = this.cart.subtotal;

  shipping = computed(() => (this.subtotal() >= 50 ? 0 : 4.99));
  total = computed(() => this.subtotal() + this.shipping());

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
}
