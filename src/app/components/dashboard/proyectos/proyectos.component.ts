import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  form: FormGroup;
  @Input() proyectos?: Proyectos ;

  constructor(private fb: FormBuilder, private _proyectosService: ProyectosService,
     private _snackBar: MatSnackBar, 
     private router: Router,
     private route: ActivatedRoute) { 
    
    
    this.form = this.fb.group({
    titulo: [''],
    url_muestra: [''],
    descripcion: [''],
  });}

  ngOnInit(): void {this.cargaProyectos();

  }

  editarProyectos() {


  
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this._proyectosService.updateProyectos(id ,this.form.value)
    .subscribe((data) => {
      
      this._snackBar.open(
        'Se Actualizado el Proyecto',
        'Proyecto Actualizado',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
       //this.form.reset();
      this.router.navigate(['dashboard/inicio']);
    });
   
  }

    cargaProyectos() {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
  
      this._proyectosService.getProyectosDetalle(id).subscribe((data) => {
        this.proyectos = data;
  
        this.form.setValue({
          titulo: this.proyectos?.titulo,
          url_muestra: this.proyectos?.url_muestra,
          descripcion: this.proyectos?.descripcion
          
        });
      });
    }

    redir() {
      this.form.reset();
      this.router.navigate(['dashboard/inicio']);
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
  }



