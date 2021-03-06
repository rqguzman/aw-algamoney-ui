import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { NotAuthenticatedError } from '../seguranca/money-http.service';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private toastyService: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {

    let msg: string;

    if (typeof errorResponse === 'string') {

      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';



    }else if (errorResponse instanceof Response
                      && errorResponse.status >= 400
                      && errorResponse.status <= 499) {

      let errors;

      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {

        msg = 'Você não possui permissão de acesso para executar essa ação.';
      }

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) {

        console.error('Ocorreu um erro.', errorResponse);

      }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toastyService.error(msg);
  }

}
