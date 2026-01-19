import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';

import { OffersService } from '../../services/offers-service';
import { CommonModule } from '@angular/common';
import { BackButton } from '../../components/shared/back-button/back-button';
import { Offer } from '../../models/offer';

@Component({
  selector: 'offer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BackButton],
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
    this.offer$ = this.route.data.pipe(map(d => d['offer'] as Offer));
    // this.offer$ = this.route.paramMap.pipe(
    //   switchMap((params) => this.offersService.getOfferById(params.get('id') ?? '')),
    //   tap((offer) => {
    //     if (!offer) this.router.navigateByUrl('/not-found');
    //   }),
    // );
  }
}
