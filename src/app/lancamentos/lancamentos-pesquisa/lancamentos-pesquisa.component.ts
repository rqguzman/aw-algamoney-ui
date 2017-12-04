import { Component, OnInit } from '@angular/core';

import { LancamentosService } from './../lancamentos.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];

  constructor(private lancamentosService: LancamentosService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentosService.pesquisar()
      .then(lancamentosRecebidos => this.lancamentos = lancamentosRecebidos);
  }
}
