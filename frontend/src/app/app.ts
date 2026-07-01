import { Component } from '@angular/core';
import { PalestrantesPageComponent } from './pages/palestrantes-page/palestrantes-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PalestrantesPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
