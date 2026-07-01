import { Component, OnInit } from '@angular/core';
import { Palestrante } from '../../models/palestrante.model';
import { PalestranteService } from '../../services/palestrante.service';
import { PalestranteCardComponent } from '../../components/palestrante-card/palestrante-card.component';

@Component({
  selector: 'app-palestrantes-page',
  standalone: true,
  imports: [PalestranteCardComponent],
  templateUrl: './palestrantes-page.component.html',
  styleUrl: './palestrantes-page.component.scss'
})
export class PalestrantesPageComponent implements OnInit {
  protected palestrantes: Palestrante[] = [];

  constructor(private readonly palestranteService: PalestranteService) {}

  ngOnInit(): void {
    this.palestranteService.buscarPalestrantes().subscribe((palestrantes) => {
      this.palestrantes = palestrantes;
    });
  }
}
