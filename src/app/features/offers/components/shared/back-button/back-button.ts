import { Component, Input } from '@angular/core';
import { CONSTANTS } from '../../../utils/constants';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'back-button',
  imports: [ MatButtonModule, MatIconModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {
  @Input() title!: string;
  readonly CONSTANTS = CONSTANTS;
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
