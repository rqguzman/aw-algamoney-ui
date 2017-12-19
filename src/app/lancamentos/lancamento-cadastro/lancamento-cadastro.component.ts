import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';
import { LancamentosService } from '../lancamentos.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private lancamentosService: LancamentosService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.titleService.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando () {
    return Boolean (this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentosService.buscarPorCodigo(codigo)
      .then(lancamentoRecebido => {
        this.lancamento = lancamentoRecebido;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarlancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentosService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate([ '/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  atualizarlancamento(form: FormControl) {
    this.lancamentosService.atualizar(this.lancamento)
      .then(lancamentoAtualizado => {
        this.lancamento = lancamentoAtualizado;

        this.toasty.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categoriasRecebidas => {
        this.categorias = categoriasRecebidas.map(c => {
          return {label: c.nome , value: c.codigo };
        });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPessoas() {
    return this.pessoasService.listarTodas()
      .then(pessoasRecebidas => {
        this.pessoas = pessoasRecebidas.map(p => ({label: p.nome, value: p.codigo}));
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 3);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.titleService.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
