import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAccessTokenInvalido()) {
      console.log('Navegação com Access Token inválido. Obtendo novo token.');
      return this.authService.obterNovoAccessToken()
        .then(() => {
          if (this.authService.isAccessTokenInvalido()) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });
    } else if (next.data.roles && !this.authService.temQualquerPermissao(next.data.roles)) {
      this.router.navigate(['/acesso-nao-autorizado']);
      return false;
    }
      return true;
  }
}
