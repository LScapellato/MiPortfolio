import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { LoginComponent } from '../../login/login.component';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];
  nombreUsuario = '';
  rolActual = '';
  roles: Array<string>[] = [];
  isAdmin = false;
  isInvitado = false;

  @ViewChild(LoginComponent) loginComponent: LoginComponent | undefined;

  constructor(
    private _menuService: MenuService,
    private auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.rol();
    this.user();
    this.cargarMenu();
  }
  //obtengo el menu de navegacion desde menu.json (local) 
  cargarMenu() {
    this._menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }

  user() {
    if (
      JSON.stringify(this.auth.UsuarioAutenticado.nombreUsuario) !== undefined
    ) {
      this.nombreUsuario = this.auth.UsuarioAutenticado.nombreUsuario;
    } else {
      this.nombreUsuario = 'Invitado';
    }
  }

  openLogin() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
    this.dialog.open(LoginComponent);
  }
  // ESTO LO OBTENGO DESDE EL AUTH SERVICE
  // rol() {
  //   this.roles = this.auth.UsuarioAutenticado.authorities;
  //   console.log(JSON.stringify(this.roles))

  //   if (JSON.stringify(this.roles) !== undefined) {

  //    if (JSON.stringify(this.roles).includes('ROLE_ADMIN')) {
  //     this.isAdmin = true;
  //     this.rolActual = 'Administrador';
  //     console.log('es admin?' + this.rolActual)

  //   }

  //   else  {
  //     (!JSON.stringify(this.roles).includes('ROLE_ADMIN') && JSON.stringify(this.roles).includes('ROLE_USER'))
  //     this.isAdmin= false;
  //     this.rolActual ="Usuario";

  //       console.log('es user?' + this.rolActual)
  //   }

  //   }
  //   else {
  //     this.rolActual="Invitado";
  //     this.isInvitado =true
  //   }
  // }

  logOut() {
    this.auth.logOut();
  }
  rol() {
    this.rolActual = this.auth.Rol();

    if (this.rolActual !== 'Administrador' && this.rolActual !== 'Usuario') {
      this.isAdmin = false;
      this.isInvitado = true;
    } else {
      if (this.rolActual == 'Administrador') this.isAdmin = true;
      this.isInvitado = false;
    }
  }
}
