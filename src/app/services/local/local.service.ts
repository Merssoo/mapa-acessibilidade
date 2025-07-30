import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private apiUrl = 'https://seu-backend.com/api/locais'; // Altere para o URL real

  constructor(private http: HttpClient) {}

  getLocais(limit: number, offset: number): Observable<{ items: Local[], total: number }> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<{ items: Local[], total: number }>(this.apiUrl, { params });
  }

  registrarLocal(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}
