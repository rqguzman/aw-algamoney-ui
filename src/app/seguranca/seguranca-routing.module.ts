import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';

const rotas: Routes = [
  {path: 'login', component: LoginFormComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class SegurancaRoutingModule { }
