import { Component, Input } from '@angular/core';
import { Palestrante } from '../../models/palestrante.model';


@Component({
  selector: 'app-palestrante-card',
  standalone: true,
  templateUrl: './palestrante-card.component.html',
  styleUrl: './palestrante-card.component.scss'
})
export class PalestranteCardComponent {
  @Input({ required: true }) palestrante!: Palestrante;
}
