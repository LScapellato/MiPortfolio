import { Component, OnInit,  Output } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { CrearExperienciaComponent } from './crear-experiencia/crear-experiencia.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  roles: Array<string> = [];
  isAdmin = false;
  rolActual = '';
  isInvitado = true;
  @Output() idActual?: number;

  // @ViewChild(CrearExperienciaComponent) crear?: CrearExperienciaComponent;
  // listnueva = [1, 2, 3, 4];
  // [x: string]: any;
  listExperiencia: any;
  private _experiencia: any;
  
  public get experiencia(): any {
    return this._experiencia;
  }
  public set experiencia(value: any) {
    this._experiencia = value;
  }
  constructor(
    private _experienciaService: ExperienciaService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarExperiencia();
    this.rol();
  }
  cargarExperiencia() {
    this._experienciaService.getExperiencia().subscribe((data) => {
      this.listExperiencia = data;
     
    });
  }
  openCrearExperiencia() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal no estoy seguro que sea la mejor forma.
    


    const dialogRef = this.dialog.open(CrearExperienciaComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.cargarExperiencia();
    });





  }

  irEditar(id:number) {
    this.router.navigate(['/dashboard/experiencia-editar/'+ id])
  }

  borrarExperiencia(id: number) {
    this._experienciaService.deleteExperiencia(id).subscribe((data) => {
      this._snackBar.open(
        'Se ha eliminado esta Experiencia',
        'Experiencia Eliminada',
        {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    });
    this.cargarExperiencia();
  }

  // detalleExperiencia(id: number) {
  //   this.idActual = id;

  //   this.router.navigate(['/dashboard/experiencia-editar/' + id]);
  // }

  // largoLista() {
  //   const largo = this.listExperiencia.length;

  //   return console.log(largo);
  // }
//Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.listExperiencia,
      event.previousIndex,
      event.currentIndex
    );
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
