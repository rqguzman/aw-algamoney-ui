import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-acesso-nao-autorizado',
  template: `
    <div class="container">

      <h1>Acesso negado!</h1>
      <h1 class="text-center"> A página não pode ser exibida.</h1>

      <p>
        Caso entenda que deveria ter acesso a essa página, queira
        por gentileza entrar em contato com o administrador do Sistema.
      </p>

      <p>Se quiser retornar para sua página de origem, <a (click)="voltarParaAPaginaAnterior()">clique aqui.</a></p>
    </div>
  `,
  styles: []
})
export class AcessoNaoAutorizadoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltarParaAPaginaAnterior() {
    this.location.back();
  }

}
