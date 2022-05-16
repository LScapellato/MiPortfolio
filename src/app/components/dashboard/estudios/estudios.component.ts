import { Component, OnInit, Output } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { EstudiosService } from 'src/app/services/estudios.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEstudioComponent } from './crear-estudio/crear-estudio.component';
@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent {
  isAdmin = false;
  rolActual = '';
  isInvitado = true;
  
  
  estudios: any;
  private _estudios: any;
  @Output() idActual?: number;


  constructor(
    private router: Router,
    private _estudiosService: EstudiosService,
    public _snackBar: MatSnackBar,
    private auth: AuthService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.cargarEstudios();
    this.rol()
  }

  cargarEstudios () {
    this._estudiosService.getEstudios().subscribe((estudios)=>{
      this.estudios= estudios
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.estudios, event.previousIndex, event.currentIndex);
  }

  borrarEstudio (id: number) {
    this._estudiosService.deleteEstudio(id).subscribe((data)=>{
      this._snackBar.open(
        'Elemento eliminado',
        '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }
      );
    });
    this.cargarEstudios();
  }

  //TODO Investigar esto para evitar repetir en todos los componentes
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

openCrearEstudio() {
  //Pasamos nuestro componente del contenido que queremos pasar al modal no estoy seguro que sea la mejor forma.
  


  const dialogRef = this.dialog.open(CrearEstudioComponent);

  dialogRef.afterClosed().subscribe(result => {
    this.cargarEstudios();
  });





}

detalleEstudio(id: number) {
  this.idActual = id;
  console.log(id)
  this.router.navigate(['/dashboard/editar-estudio/' + id]);
}


}
