import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { CrearProyectosComponent } from './crear-proyectos/crear-proyectos.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  listproyectos: any;
  private _proyecto: any;
  isAdmin = false;
  rolActual= '';
  isInvitado = true;
  @Output() idActual?: number;

  constructor(
    private _proyectosService: ProyectosService,
    public _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService,

  ) { }

  ngOnInit(): void {this.cargarProyectos();this.rol();
  }

  cargarProyectos() {
    this._proyectosService.getProyectos().subscribe((proyectos) => {
      this.listproyectos= proyectos;
    })
  }

  openCrearProyectos() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
   const dialogRef= this.dialog.open(CrearProyectosComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.cargarProyectos();
   })
  }

   ///TODO REPITO EL CODIGO VER COMO RESOLVER
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
  borrarProyecto (id: number) {
    this._proyectosService.deleteProyectos(id).subscribe((data)=>{
      this._snackBar.open(
        'Elemento eliminado',
        '',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
       this.cargarProyectos();
    });
    
  }

  detalleProyecto(id: number) {
    this.idActual = id;
    
    this.router.navigate(['/dashboard/proyectos/' + id]);
  }
}

