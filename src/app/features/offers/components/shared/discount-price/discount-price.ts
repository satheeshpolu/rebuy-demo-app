import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'discount-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discount-price.html',
  styleUrls: ['./discount-price.css'],
})
export class DiscountPrice {
  @Input({ required: true }) price!: number;
  @Input() discountPercentage: number | null | undefined = null;

  // Optional
  @Input() currencySymbol: string = '€';
  @Input() showChip: boolean = true;

  private readonly _price = signal<number>(0);
  private readonly _discount = signal<number>(0);

  ngOnChanges() {
    this._price.set(Number(this.price ?? 0));
    this._discount.set(Number(this.discountPercentage ?? 0));
  }

  readonly hasDiscount = computed(() => this._discount() > 0);

  readonly finalPrice = computed(() => {
    const p = this._price();
    const d = this._discount();
    if (!d) return p;
    return p * (1 - d / 100);
  });

  readonly discountLabel = computed(() => `-${Math.round(this._discount())}%`);
}
