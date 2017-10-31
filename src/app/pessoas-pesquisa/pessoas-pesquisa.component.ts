import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas = [
    {nome: 'Rafael Guzmán', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'Daniela Baptista', cidade: 'Vitória', estado: 'ES', ativo: false},
    {nome: 'Angel Torres', cidade: 'Niterói', estado: 'RJ', ativo: true},
    {nome: 'Pedro Queiroz', cidade: 'Köln', estado: 'NW', ativo: true},
    {nome: 'Jane Vitória', cidade: 'Niterói', estado: 'RJ', ativo: false},
    {nome: 'Daniel Queiroz', cidade: 'Volta Redonda', estado: 'RJ', ativo: true}
  ];
}
