import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [
    LancamentosService,
    PessoasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
