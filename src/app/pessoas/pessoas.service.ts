import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

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
}
