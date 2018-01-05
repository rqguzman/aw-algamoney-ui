import { NgModule } from '@angular/core';
// import { LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { LancamentosService } from './../lancamentos/lancamentos.service';
import { PessoasService } from './../pessoas/pessoas.service';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './../seguranca/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentosService,
    PessoasService,
    CategoriaService,
    ErrorHandlerService,
    AuthService,

    ConfirmationService,
    Title
    // { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
