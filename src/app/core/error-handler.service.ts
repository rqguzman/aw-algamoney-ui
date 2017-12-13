import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {

    let msg: string;

    if (typeof errorResponse === 'string') {

      msg = errorResponse;

    } else if (errorResponse instanceof Response
                      && errorResponse.status >= 400
                      && errorResponse.status <= 499) {

      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        msg = errorResponse.json()[0].mensagemUsuario;
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
