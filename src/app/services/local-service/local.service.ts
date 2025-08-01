import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';

export interface Local {
  bairro: string;
  rua: string;
  tipoLocal: string;
  acessivel: boolean;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(private http: ApiService) {}

  getLocais(limit: number, offset: number): Observable<{ content: Local[], totalElements: number }> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<{ content: Local[], totalElements: number }>('/locais', { params });
  }

  registrarLocal(dados: any): Observable<any> {
    return this.http.post('/locais', dados);
  }
}
