import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
  styleUrls: ['./crear-experiencia.component.css'],
})
export class CrearExperienciaComponent implements OnInit {
  form: any;
  @Input() experiencia: any;
  imagenes: any[]= [];
  _imagenurl: any;
  

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _experienciaService: ExperienciaService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private storage:StorageService
  ) {
    this.form = this.fb.group({
      nombre_empresa: ['', Validators.required],
      puesto: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      actual: ['', Validators.required],
      tipoempleo: ['', Validators.required],
      url_imagen: [''],
    });
  }

  ngOnInit(): void {
    
  }

  public openDialog() {
    this.dialog.open(CrearExperienciaComponent);
  }

  agregarExperiencia() {
    this._experienciaService
    
      .saveExperiencia(this.form.value)
      .subscribe((data) => {
       
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

  cargarImagen(event:any) {

    console.log(event.target.files);
    let imagen =event.target.files
    let reader= new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onprogress 
    reader.onloadend= ()=>{
      console.log(reader.result)
      this.imagenes.push(reader.result)
      this.storage.subirImagen(this.form.value.nombre_empresa + "_" + Date.now(), reader.result).then(urlImagen=>{
        this._imagenurl =  urlImagen?.toString(), 
        this.form.patchValue({url_imagen: this._imagenurl})
        
      })
      this._snackBar.open(
        'La imagen se cargo correctamente',
        'Imagen Actualizada',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        }
      );
    }

    

    

  }

 
  // cargarurl() {
  //   this.form.patchValue({url_imagen: this._imagenurl}),
  //   console.log(typeof (this._imagenurl))
  //   console.log(this._imagenurl)
  // }
}
