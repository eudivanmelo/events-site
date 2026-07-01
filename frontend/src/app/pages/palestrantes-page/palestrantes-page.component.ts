import { Component, inject, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
export class PalestrantesPageComponent {
  protected readonly termoBusca = signal('');
  protected readonly carregando = signal(true);
  protected readonly palestrantes = toSignal(
    toObservable(this.termoBusca).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.carregando.set(true)),
      switchMap((termo) => this.palestranteService.buscarPalestrantes(termo)),
      tap(() => this.carregando.set(false))
    ),
    { initialValue: [] as Palestrante[] }
  );

  constructor(private readonly palestranteService: PalestranteService) {}

  atualizarTermoBusca(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.termoBusca.set(input.value);
  }
}
