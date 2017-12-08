import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentoFiltro, LancamentosService } from './../lancamentos.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalDeRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(private lancamentosService: LancamentosService) {}

  ngOnInit() { }

  pesquisar(paginaPesquisada = 0) {
    this.filtro.pagina = paginaPesquisada;

    this.lancamentosService.pesquisar(this.filtro)
      .then(resultados => {
        this.totalDeRegistros = resultados.total;
        this.lancamentos = resultados.lancamentosRetornados;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentosService.excluir(lancamento.codigo)
    .then(() => {
      //this.grid.first = 0;
      this.pesquisar(this.filtro.pagina);
    });
  }
}
