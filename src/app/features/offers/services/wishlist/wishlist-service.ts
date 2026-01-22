import { Injectable, computed, effect, signal } from '@angular/core';
import { WishlistItem } from '../../models/wishlist-model';

const STORAGE_KEY = 'wishlist_v1';

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly _items = signal<WishlistItem[]>(
    safeParse<WishlistItem[]>(localStorage.getItem(STORAGE_KEY), []),
  );

  readonly items = this._items;
  readonly count = computed(() => this._items().length);

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items())));
  }

  has(id: number): boolean {
    return this._items().some((x) => x.id === id);
  }

  add(item: WishlistItem) {
    if (this.has(item.id)) return;
    this._items.set([item, ...this._items()]);
  }

  remove(id: number) {
    this._items.set(this._items().filter((x) => x.id !== id));
  }

  toggle(item: WishlistItem): boolean {
    if (this.has(item.id)) {
      this.remove(item.id);
      return false;
    }
    this.add(item);
    return true;
  }

  clear() {
    this._items.set([]);
  }
}
