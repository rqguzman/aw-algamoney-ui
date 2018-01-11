import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';

export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoasFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {search: params})
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultados = {
          pessoasRetornadas: pessoas,
          total: responseJson.totalElements
        };

        return resultados;
      });
  }

  listarTodas (): Promise<any> {


    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo` , ativo)
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post(this.pessoasUrl,
          JSON.stringify(pessoa))
        .toPromise()
        .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
      JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const pessoaAlterada = response.json() as Pessoa;

        return pessoaAlterada;
      });
  }

  buscarPorCódigo(codigo: number): Promise<Pessoa> {

    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoaRecebida = response.json() as Pessoa;

        return pessoaRecebida;
      });
  }
}
