import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudiosService } from 'src/app/services/estudios.service';

@Component({
  selector: 'app-crear-estudio',
  templateUrl: './crear-estudio.component.html',
  styleUrls: ['./crear-estudio.component.css']
})
export class CrearEstudioComponent implements OnInit {
  form: any;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _estudiosService: EstudiosService,
    private _snackBar: MatSnackBar,

  ) {
    this.form = this.fb.group({
      institucion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      url_imagen: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
      
    })
   }

  ngOnInit(): void {
  }
  
  agregarEstudio() {
    this._estudiosService
    
      .saveEstudio(this.form.value)
      .subscribe((estudio) => {
       
        this._snackBar.open(
          'Se ha Creado Elemento',
          'Estudio Guardado',
          {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
        this.form.reset();
      });
  }
}
