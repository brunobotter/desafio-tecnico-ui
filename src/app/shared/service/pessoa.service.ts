import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pessoa } from '../model/Pessoa';

export class Filtro {
  nome: string;
  page = 0;
  limite = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  apiUrl = "http://localhost:8080/api/pessoa";
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  buscarPorId(id: number): Observable<Pessoa>{
    return this.http.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  listaTodos(filtro: Filtro): Observable<any>{
    let params = new HttpParams()
    .set('page', filtro.page.toString())
    .set('limite', filtro.limite.toString());
    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }
  return this.http.get<any>(`${this.apiUrl}/busca/`, {params})
  .pipe(map(response =>{
    const cliente = response._embedded?.pessoaList;
    const resultado = {
      cliente,
      total: response.page
    };
    return resultado;
  }));
  }

  deletar(id: number): Observable<Pessoa>{
    return this.http.delete<Pessoa>(`${this.apiUrl}/${id}`)
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(this.apiUrl, pessoa)
  }

  atualizar(id: number, pessoa: Pessoa): Observable<Pessoa>{
    return this.http.put<Pessoa>(`${this.apiUrl}/${id}`, pessoa , this.httpOption)
  }


}
