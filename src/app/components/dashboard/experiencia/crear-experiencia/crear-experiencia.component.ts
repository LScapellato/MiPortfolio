import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
  styleUrls: ['./crear-experiencia.component.css'],
})
export class CrearExperienciaComponent implements OnInit {
  form: any;
  @Input() experiencia: any;

  // options: string[] = ['One', 'Two', 'Three'];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _experienciaService: ExperienciaService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
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

  ngOnInit(): void {
    this.cargaExp();
  }

  openDialog() {
    this.dialog.open(CrearExperienciaComponent);
  }

  agregarExperiencia() {
    this._experienciaService
      .saveExperiencia(this.form.value)
      .subscribe((data) => {
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
        this.form.reset();
      });
  }

  editarExperiencia() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    console.log(this.form.value.all);
    this._experienciaService
      .updateExperiencia(id, this.form.value)
      .subscribe((data) => {
        this._snackBar.open(
          'Se Actualizado esta Experiencia',
          'Experiencia Actualizada',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
        // this.form.reset();
        this.router.navigate(['/dashboard']);
      });
  }

  cargaExp() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this._experienciaService.getDetalle(id).subscribe((data) => {
      this.experiencia = data;

      this.form.setValue({
        nombre_empresa: this.experiencia.nombre_empresa,
        puesto: this.experiencia.puesto,
        fecha_inicio: this.experiencia.fecha_inicio,
        fecha_fin: this.experiencia.fecha_fin,
        actual: this.experiencia.actual,
        descripcion: this.experiencia.descripcion,
        tipoempleo: this.experiencia.tipoempleo,
      });
    });
  }
}
