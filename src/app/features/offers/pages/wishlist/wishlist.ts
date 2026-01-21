import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist/wishlist-service';
import { DiscountPrice } from '../../components/shared/discount-price/discount-price';
import { EmptyState } from '../../components/shared/empty-state/empty-state';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, DiscountPrice, EmptyState],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
})
export class WishlistPage {
  private readonly wishlist = inject(WishlistService);

  items = this.wishlist.items;
  count = this.wishlist.count;

  remove(id: number) {
    this.wishlist.remove(id);
  }

  clear() {
    this.wishlist.clear();
  }
}
