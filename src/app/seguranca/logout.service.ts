import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

    tokensRevokeUrl= 'http://localhost:8080/tokens/revoke';

  constructor(
    private httpService: AuthHttp,
    private authService: AuthService
  ) { }

  logout() {
    return this.httpService.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
    });
  }

}
