import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { getStorage , ref, deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-experiencia-editar',
  templateUrl: './experiencia-editar.component.html',
  styleUrls: ['./experiencia-editar.component.css']
})
export class ExperienciaEditarComponent implements OnInit {
  form: any
  @Input() experiencia: any;
   storage = getStorage();
  constructor(private route: ActivatedRoute,
    private router: Router,
    private _experienciaService: ExperienciaService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    ) { 

    this.form = this.fb.group({
      nombre_empresa: [''],
      puesto: [''],
      descripcion: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      actual: [''],
      tipoempleo: [''],
      url_imagen: [''],

    });
  }
  ngOnInit(): void {this.cargaExp();
  }

  editarExperiencia() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    // console.log(this.form.value.all);
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
        this.router.navigate(['/dashboard/inicio']);
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
        url_imagen: this.experiencia.url_imagen,
      });
    });
  }

    
}
