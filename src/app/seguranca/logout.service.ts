import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';

import { environment } from './../../environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

    tokensRevokeUrl: string;

  constructor(
    private httpService: AuthHttp,
    private authService: AuthService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.httpService.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.authService.limparAccessToken();
    });
  }

}
