import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../inicio/dialogo/dialogo.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  isAdmin = false;
  rolActual = '';
  isInvitado = true;

  displayedColumns: string[] = [
    'nombre y apellido',
    
    
    
    'descripcion',
    'acciones'
  ];
  //filtro
  dataSource!: MatTableDataSource<any>;

  


  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private auth: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.rol();
  }

  cargarUsuarios() {
    this._usuarioService.getPerson().subscribe((data) => {
      this.listUsuarios = this.dataSource = data;

      
    });
  }

  eliminarUsuario(id: number) {
    
    this._usuarioService.deletePerson(id).subscribe((data) => {
     
    })
    

    this._snackBar.open('Usuario Eliminado Correctamente', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    this.cargarUsuarios();
  }

  

  //metodo paginador
  // ngAfterViewInit() {
    
  //   this.dataSource.sort = this.sort;
  // }
  
  openDialog() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
    const dialogRef = this.dialog.open(DialogoComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //TODO Investigar esto para hacerlo mejor
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

