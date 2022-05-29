import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  esperarRol?: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.auth.UsuarioAutenticado.authorities;

    if (
      currentUser &&
      JSON.stringify(currentUser).includes('ROLE_ADMIN') === true
    ) {
      
      return true;
    } else {
      //Cuando no esta registrado el Administrador en las paginas que administra el Guards veo mensaje de confirmación para login o salir al dash
      var mensaje = confirm(
        'Debe tener permisos de Administrador para esta operación'
      );
      if (mensaje) {
        this.dialog.open(LoginComponent);
      } else {
        this.router.navigate(['/inicio']);
      }

      return false;
    }
  }
}
