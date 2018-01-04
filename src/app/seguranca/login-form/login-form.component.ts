import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private toastyService: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
  }

  login(usuario: string, senha: string) {}

}
