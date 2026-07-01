import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  protected carregando = true;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly palestranteService: PalestranteService) {}

  ngOnInit(): void {
    this.palestranteService
      .buscarPalestrantes()
      .pipe(finalize(() => {
        this.carregando = false;
      }))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((palestrantes) => {
        this.palestrantes = palestrantes;
      });
  }
}
