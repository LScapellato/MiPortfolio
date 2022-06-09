import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-crear-proyectos',
  templateUrl: './crear-proyectos.component.html',
  styleUrls: ['./crear-proyectos.component.css']
})
export class CrearProyectosComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private _proyectosService: ProyectosService,
    private _snackBar: MatSnackBar, 
    private router: Router,
    private route: ActivatedRoute) {
      this.form = this.fb.group({
        titulo: [''],
        url_muestra: [''],
        descripcion: [''],
      });}
     

  ngOnInit(): void {
  }
  agregarProyecto() {
    this._proyectosService.saveProyectos(this.form.value).subscribe(
      (proyecto) => {
        
        this._snackBar.open(
          'Se ha Creado Proyecto Correctamente',
          'Proyecto Creado',
          {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
        this.form.reset();
        

      },

      (err) => {
       console.log(err);
      }
    );
  }

  redir() {
    this.form.reset();
    this.router.navigate(['dashboard/inicio']);
  }
}
