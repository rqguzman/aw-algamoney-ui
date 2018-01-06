import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private titleService: Title,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Login');
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .then( () => {
        this.router.navigate(['/lancamentos']);
      })
      .catch( erro => {
          this.errorHandlerService.handle(erro);
        }
      );
  }

}
