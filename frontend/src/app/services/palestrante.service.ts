import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Palestrante } from '../models/palestrante.model';

@Injectable({
  providedIn: 'root'
})
export class PalestranteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/palestrantes';

  buscarPalestrantes(termoBusca = ''): Observable<Palestrante[]> {
    const termoNormalizado = termoBusca.trim();
    const temFiltroDeNome = termoNormalizado.length > 0;
    const params = temFiltroDeNome
      ? new HttpParams().set('campo', 'nome').set('valor', termoNormalizado)
      : undefined;

    const requisicao = params
      ? this.http.get<Palestrante[]>(this.apiUrl, { params })
      : this.http.get<Palestrante[]>(this.apiUrl);

    return requisicao.pipe(
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
