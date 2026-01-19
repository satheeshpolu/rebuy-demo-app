import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackButton } from '../../components/shared/back-button/back-button';

@Component({
  selector: 'not-found',
  imports: [RouterModule, BackButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {

}
