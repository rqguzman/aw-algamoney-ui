import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Pessoa } from './../core/model';

export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoasFiltro): Promise<any> {

    const params = new URLSearchParams();
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {headers: cabecalhos, search: params})
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
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers: cabecalhos })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers: cabecalhos })
      .toPromise()
      .then(() => null);
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    cabecalhos.append('Content-Type' , 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo` , ativo, { headers: cabecalhos })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    cabecalhos.append('Content-Type' , 'application/json');

    return this.http.post(this.pessoasUrl,
          JSON.stringify(pessoa),
          { headers: cabecalhos })
        .toPromise()
        .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    cabecalhos.append('Content-Type' , 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
      JSON.stringify(pessoa),
      { headers: cabecalhos})
      .toPromise()
      .then(response => {
        const pessoaAlterada = response.json() as Pessoa;

        return pessoaAlterada;
      });
  }

  buscarPorCódigo(codigo: number): Promise<Pessoa> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    cabecalhos.append('Content-Type' , 'application/json');

    return this.http.get(`${this.pessoasUrl}/${codigo}`,
    { headers: cabecalhos})
      .toPromise()
      .then(response => {
        const pessoaRecebida = response.json() as Pessoa;

        return pessoaRecebida;
      });
  }
}
