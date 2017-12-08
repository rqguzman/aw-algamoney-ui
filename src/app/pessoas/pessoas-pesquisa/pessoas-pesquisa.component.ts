import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { PessoasService, PessoasFiltro } from './../pessoas.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  totalDeRegistros = 0;
  filtro = new PessoasFiltro();
  pessoas = [];

  constructor(private pessoasService: PessoasService) {}

  pesquisar(paginaPesquisada = 0) {
    this.filtro.pagina = paginaPesquisada;

    this.pessoasService.pesquisar(this.filtro)
      .then(resultados => {
        this.totalDeRegistros = resultados.total;
        this.pessoas = resultados.pessoasRetornadas;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
