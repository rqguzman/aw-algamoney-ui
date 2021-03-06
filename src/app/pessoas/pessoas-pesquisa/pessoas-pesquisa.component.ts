import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ToastyService } from 'ng2-toasty';

import { PessoasService, PessoasFiltro } from './../pessoas.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalDeRegistros = 0;
  filtro = new PessoasFiltro();
  pessoas = [];

  constructor(
    private pessoasService: PessoasService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Pesquisa de pessoas');
   }

  pesquisar(paginaPesquisada = 0) {
    this.filtro.pagina = paginaPesquisada;

    this.pessoasService.pesquisar(this.filtro)
      .then(resultados => {
        this.totalDeRegistros = resultados.total;
        this.pessoas = resultados.pessoasRetornadas;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(() => {
        this.pesquisar(this.filtro.pagina);
        this.toastyService.success('Pessoa removida com sucesso!');
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  alterarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoasService.alterarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;

        this.toastyService.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
