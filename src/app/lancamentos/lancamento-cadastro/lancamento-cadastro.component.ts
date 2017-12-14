import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoasService } from '../../pessoas/pessoas.service';
import { Lancamento } from '../../core/model';

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
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
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
