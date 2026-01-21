import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';

import { OffersService } from '../../services/offers-service';
import { CommonModule } from '@angular/common';
import { BackButton } from '../../components/shared/back-button/back-button';
import { Offer } from '../../models/offer';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'offer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BackButton, MatIconModule],
  templateUrl: './offer-details.html',
  styleUrls: ['./offer-details.css'],
})
export class OfferDetail implements OnInit {
  offer$!: Observable<Offer | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offersService: OffersService,
  ) {}

  ngOnInit(): void {
    this.offer$ = this.route.data.pipe(map((d) => d['offer'] as Offer));
    this.offer$.subscribe((res) => console.log(res));
    // this.offer$ = this.route.paramMap.pipe(
    //   switchMap((params) => this.offersService.getOfferById(params.get('id') ?? '')),
    //   tap((offer) => {
    //     if (!offer) this.router.navigateByUrl('/not-found');
    //   }),
    // );
  }
  selectedImage: string | null = null;

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  addToCart(product: Offer): void {
    console.log(product)
    this.router.navigate(['/cart']);
  }

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
