import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Main } from './features/offers/layouts/main/main';
import { Footer } from './features/offers/layouts/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rebuy-demo-app');
}
