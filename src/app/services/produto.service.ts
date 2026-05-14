import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly apiurl = 'http://localhost:3000/produtos';
  private readonly http = inject(HttpClient);

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiurl);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiurl, produto);
  }

  atualizar(produto: Produto, id: number): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiurl}/${id}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}