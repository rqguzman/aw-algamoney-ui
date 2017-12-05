import { any } from 'codelyzer/util/function';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable()
export class LancamentosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
      { headers: cabecalhos, search: params })
      .toPromise()
      .then(response => response.json().content);
  }

}
