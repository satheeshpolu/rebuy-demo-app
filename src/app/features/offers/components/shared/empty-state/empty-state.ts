import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'empty-state',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css'],
})
export class EmptyState {
  @Input({ required: true }) icon = 'favorite_border';
  @Input({ required: true }) title = '';
  @Input({ required: true }) description = '';

  @Input() ctaLabel = 'Browse offers';
  @Input() ctaLink = '/offers';
  @Input() ctaIcon = 'local_offer';
}
