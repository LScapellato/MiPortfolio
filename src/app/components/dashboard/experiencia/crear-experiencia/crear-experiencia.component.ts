import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Experiencia } from 'src/app/interfaces/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { ExperienciaComponent } from '../experiencia.component';

@Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
  styleUrls: ['./crear-experiencia.component.css'],
})
export class CrearExperienciaComponent implements OnInit {


  @ViewChild(ExperienciaComponent) este!: ExperienciaComponent;
  form: any;
  @Input() experiencia: any;
  @Input()
  idActual!: number;
  options: string[] = ['One', 'Two', 'Three']

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _experienciaService: ExperienciaService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearExperienciaComponent>,



  ) {
    this.form = this.fb.group({
      nombre_empresa: [''],
      puesto: [''],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      actual: [''],
      tipoempleo: [''],
    });


  }

  ngOnInit(): void { }

  openDialog() {
    this.dialog.open(CrearExperienciaComponent, {
      height: '100px',
      width: '600px',
    });
  }

  agregarExperiencia() {


    this._experienciaService.saveExperiencia(this.form.value).subscribe((data) => {

      console.log(data);
      this._snackBar.open(
        'Se ha Creado Experiencia correctamente',
        'Experiencia Creada',
        {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }

      );
      this.form.reset()


    });

  }

  public editarExperiencia(experiencia: any) {

    this.form.setValue(
      {
        nombre_empresa: experiencia.nombre_empresa,
        puesto: experiencia.puesto.value,
        fecha_inicio: experiencia.fecha_inicio.value,
        fecha_fin: experiencia.fecha_fin.value,
        actual: experiencia.actual.value,
        descripcion: experiencia.descripcion.value,
        tipoempleo: experiencia.tipoempleo.value,
        id: experiencia.id.value,
      })

  }

  cargaExp(id: number) {



    this._experienciaService.getDetalle(id).subscribe((data) => {
      this.experiencia = data;

      this.form.setValue(
        {
          nombre_empresa: this.experiencia.nombre_empresa,
          puesto: this.experiencia.puesto,
          fecha_inicio: this.experiencia.fecha_inicio,
          fecha_fin: this.experiencia.fecha_fin,
          actual: this.experiencia.actual,
          descripcion: this.experiencia.descripcion,
          tipoempleo: this.experiencia.tipoempleo,

        })

      //  this.form.controls['nombre_empresa'].setValue(this.experiencia.nombre_empresa)
      //     console.log(this.experiencia.nombre_empresa)
    });

  }


}

/* @Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
})
export class CrearExperienciaComponentdialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string; }) { }
} */