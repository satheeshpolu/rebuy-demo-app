import { Component } from '@angular/core';
import { CONSTANTS } from '../../utils/constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();
  brand = CONSTANTS.BRAND;
  brandDescription = CONSTANTS.BRAND_DESCRIPTION;
  copyright = CONSTANTS.COPY_RIGHT;
  copyrightMsg = CONSTANTS.COPY_RIGHT_MESSAGE;
}
