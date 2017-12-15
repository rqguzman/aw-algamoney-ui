import { NgModule } from '@angular/core';
// import { LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';
import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentosService } from './../lancamentos/lancamentos.service';
import { CategoriaService } from './../categorias/categoria.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  declarations: [NavbarComponent],
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

    ConfirmationService
    // { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
