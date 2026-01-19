import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONSTANTS } from '../../../utils/constants';

@Component({
  selector: 'back-button',
  imports: [RouterLink],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {
  @Input() title!: string;
  readonly CONSTANTS = CONSTANTS;
}
