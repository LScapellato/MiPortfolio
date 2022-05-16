import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';
import {UsuarioService} from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  listPersona: any;
  isAdmin = false;
  rolActual = '';
  isInvitado = true;
  constructor(public dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private auth: AuthService) { }

  openDialog() {
  	//Pasamos nuestro componente del contenido que queremos pasar al modal
    const dialogRef = this.dialog.open(DialogoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this._usuarioService.getPerson().subscribe((data) => {
      this.listPersona=data;
    })
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

