import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Palestrante } from '../models/palestrante.model';

@Injectable({
  providedIn: 'root'
})
export class PalestranteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/palestrantes';

  buscarPalestrantes(): Observable<Palestrante[]> {
    return this.http.get<Palestrante[]>(this.apiUrl);
  }
}
