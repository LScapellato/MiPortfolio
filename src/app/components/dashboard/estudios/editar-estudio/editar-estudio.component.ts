import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Estudios } from 'src/app/interfaces/estudios'
import { EstudiosService } from 'src/app/services/estudios.service';
@Component({
  selector: 'app-editar-estudio',
  templateUrl: './editar-estudio.component.html',
  styleUrls: ['./editar-estudio.component.css']
})
export class EditarEstudioComponent implements OnInit {
  form: FormGroup;
  @Input() estudio?: Estudios; ;
  constructor(
    private fb: FormBuilder,private _estudiosService: EstudiosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.form = this.fb.group({
      institucion: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      titulo: [''],
      descripcion: [''],
      url_imagen: [''],
      
    });
   }

  ngOnInit(): void {this.cargaEstudio()
  }

  editarEstudio() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this._estudiosService.updateEstudio(id ,this.form.value.all).subscribe((skill) => {

      this._snackBar.open(
        'Se Actualizado esta Capacitación',
        'Estudio Actualizado',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
       this.form.reset();
      this.router.navigate(['/dashboard']);
    });


    }


    cargaEstudio() {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!);
  
      this._estudiosService.getEstudioDetalle(id).subscribe((data) => {
        this.estudio = data;
  
        this.form.setValue({
          institucion: this.estudio?.institucion,
      fecha_inicio: this.estudio?.fecha_inicio,
      fecha_fin: this.estudio?.fecha_fin,
      titulo: this.estudio?.titulo,
      descripcion: this.estudio?.descripcion,
      url_imagen: this.estudio?.url_imagen,
          
        });
      });
    }

    redir() {
      this.form.reset();
      this.router.navigate(['/dashboard']);
    }
}

