import { Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ExperienciaService } from 'src/app/services/experiencia.service';
import { DialogoComponent } from '../inicio/dialogo/dialogo.component';
import { CrearExperienciaComponent } from './crear-experiencia/crear-experiencia.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Experiencia } from 'src/app/interfaces/experiencia';
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
  @Output() idActual?: number
  
  
  @ViewChild(CrearExperienciaComponent) crear?: CrearExperienciaComponent;
  listnueva= [1,2,3,4];
  [x: string]: any;
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
    this.roles =this.auth.UsuarioAutenticado.authorities;
    this.roles?.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
        console.log("Rol admin?:" + this.isAdmin)
      }
    });
  }
  cargarExperiencia() {
    this._experienciaService.getExperiencia().subscribe((data) => {
      this.listExperiencia = data;

      
    });
  }
  openCrearExperiencia() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
    const dialogRef = this.dialog.open(CrearExperienciaComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  borrarExperiencia(id:number){
    this._experienciaService.deleteExperiencia(id).subscribe((data) => {
      

      this._snackBar.open(
        'Se ha eliminado esta Experiencia',
        'Experiencia Eliminada',
        {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        
    }, 
    

  )
  this.cargarExperiencia();
  console.log('Este '+ this.listExperiencia)
      };

  detalleExperiencia(id:number){
   console.log('Trae id?' + id)
   
     this.idActual = id;
     
     console.log(id)
     
     
     this.router.navigate(['/dashboard/crear-experiencia/'+id]) }
   
     
  //  openDialogEditar(id:number){
  //   const dialogConfig = new MatDialogConfig();
  //   this._experienciaService.getDetalle(id).subscribe((data) => { 
  //     this.experiencia = data;
    
  //   dialogConfig.data={data}
  //   this.idActual = id;
  //     console.log(data)
  //  const dialog= this.dialog.open(CrearExperienciaComponent, dialogConfig);
  //   // dialog.afterOpened.apply(this.crear?.cargaExp(id))
    
  // });
    
  //  }
      largoLista() {
        const largo= this.listExperiencia.length

        return console.log(largo)




      }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listExperiencia, event.previousIndex, event.currentIndex);
  }

  }
   
   



    
     
    
   
    
    


    
  


  

