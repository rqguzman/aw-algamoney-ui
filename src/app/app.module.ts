import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentosService } from './lancamentos/lancamentos.service';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoasService } from './pessoas/pessoas.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    LancamentosService,
    PessoasService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
