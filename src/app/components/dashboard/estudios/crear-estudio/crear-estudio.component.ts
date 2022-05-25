import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstudiosService } from 'src/app/services/estudios.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crear-estudio',
  templateUrl: './crear-estudio.component.html',
  styleUrls: ['./crear-estudio.component.css']
})
export class CrearEstudioComponent implements OnInit {
  form: any;
  imagenes: any[]= [];
  _imagenurl: any;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _estudiosService: EstudiosService,
    private _snackBar: MatSnackBar,
    private storage:StorageService

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

  cargarImagen(event:any) {

    console.log(event.target.files);
    let imagen =event.target.files
    let reader= new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onprogress 
    reader.onloadend= ()=>{
      console.log(reader.result)
      this.imagenes.push(reader.result)
      this.storage.subirImagen(this.form.value.institucion + "_" + Date.now(), reader.result).then(urlImagen=>{
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
}
