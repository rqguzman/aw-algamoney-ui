import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LancamentosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {
    const cabecalhos = new Headers();
    cabecalhos.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers: cabecalhos })
      .toPromise()
      .then(response => response.json().content);
  }

}
