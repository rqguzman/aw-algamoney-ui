import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

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
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    this.lancamentosService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
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

}
