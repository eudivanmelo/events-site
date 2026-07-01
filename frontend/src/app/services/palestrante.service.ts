import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Palestrante } from '../models/palestrante.model';

@Injectable({
  providedIn: 'root'
})
export class PalestranteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/palestrantes';

  buscarPalestrantes(): Observable<Palestrante[]> {
    return this.http.get<Palestrante[]>(this.apiUrl).pipe(
      tap((palestrantes) => {
        console.log(`API retornou ${palestrantes.length} palestrante(s).`);
      }),
      map((palestrantes) =>
        palestrantes.filter(
          (palestrante) => palestrante.empresa === 'Globo' || palestrante.nivel === 'Avançado'
        )
      ),
      catchError((erro) => {
        console.error('Falha ao buscar palestrantes. Retornando lista vazia.', erro);
        return of([] as Palestrante[]);
      })
    );
  }
}
