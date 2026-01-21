import { Injectable, computed, effect, signal } from '@angular/core';

export type CartItem = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage?: number;
  quantity: number;
  stock?: number;
};

const STORAGE_KEY = 'rebuy_cart_v1';

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(
    safeParse<CartItem[]>(localStorage.getItem(STORAGE_KEY), []),
  );

  readonly items = this._items;
  readonly count = computed(() => this._items().reduce((s, i) => s + i.quantity, 0));

  getDiscountedPrice(item: { price: number; discountPercentage?: number }): number {
    if (!item.discountPercentage) {
      return item.price;
    }

    return item.price * (1 - item.discountPercentage / 100);
  }
  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => {
      const finalPrice = this.getDiscountedPrice(item);
      return sum + finalPrice * item.quantity;
    }, 0),
  );

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items())));
  }

  add(item: Omit<CartItem, 'quantity'>, qty = 1) {
    if (qty <= 0) return;

    const items = this._items();
    const idx = items.findIndex((x) => x.id === item.id);

    if (idx >= 0) {
      const existing = items[idx];
      const nextQty = existing.quantity + qty;
      const clamped = item.stock != null ? Math.min(nextQty, item.stock) : nextQty;

      const updated = [...items];
      updated[idx] = { ...existing, quantity: clamped };
      this._items.set(updated);
      return;
    }

    const clamped = item.stock != null ? Math.min(qty, item.stock) : qty;
    this._items.set([...items, { ...item, quantity: clamped }]);
  }

  remove(id: number) {
    this._items.set(this._items().filter((x) => x.id !== id));
  }

  setQuantity(id: number, quantity: number) {
    const q = Math.max(1, Math.floor(quantity));
    this._items.set(this._items().map((x) => (x.id === id ? { ...x, quantity: q } : x)));
  }

  clear() {
    this._items.set([]);
  }
}
