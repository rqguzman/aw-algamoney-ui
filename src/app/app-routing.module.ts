import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { AcessoNaoAutorizadoComponent } from './core/acesso-nao-autorizado.component';

const rotas: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full'  },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'acesso-nao-autorizado', component: AcessoNaoAutorizadoComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(rotas)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
