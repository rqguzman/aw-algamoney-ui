import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">

      <h1>Erro 404</h1>
      <h1 class="text-center">Parece que você se perdeu...</h1>

      <p>A página que você procura pode ter sido removida, ter mudado de nome, ou estar temporariamente indisponível</p>

      <p>Por favor tente o seguinte: </p>

      <ul>
        <li>Se você digitou um endereço, verifique se a grafia está correta.</li>
        <li>Retorne a <a routerLink="/lancamentos">página inicial</a>.</li>
        <li>Se você seguiu um link, ele provavelmente está quebrado.</li>
        <li>Se quiser retornar para sua página de origem, <a (click)="voltarParaAPaginaAnterior()">clique aqui.</a></li>
      </ul>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  voltarParaAPaginaAnterior() {
    this.location.back();
  }

}
