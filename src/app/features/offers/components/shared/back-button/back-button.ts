import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from '../../../utils/constants';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'back-button',
  imports: [RouterLink, MatIconModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {
  @Input() title!: string;
  readonly CONSTANTS = CONSTANTS;
}
