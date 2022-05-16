import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css'],
})
export class DialogoComponent implements OnInit {
  
  mail = new FormControl('', [Validators.required, Validators.email]);
  today: number = Date.now();
  imagenes: any[]= [];
  _imagenurl: any;
  loading: boolean = false;

  form: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private storage:StorageService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      grado: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      mail: ['', [Validators.required, Validators.email]],
      imagenurl: [''],
      descripcion: ['', Validators.required],
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(DialogoComponent, dialogConfig);
  }

  ngOnInit(): void { }
  
  
  
  agregarUsuario() {

    this._usuarioService.savePerson(this.form.value).subscribe((data) => {
      this.router.navigate(['/dashboard/usuarios']);

      this._snackBar.open('Usuario Creado Correctamente', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.form.reset();
    });
  }

  getErrorMessage() {
    if (this.mail.hasError('required')) {
      return 'Debe ingresar un email';
    }

    return this.mail.hasError('email') ? 'No es un email valido' : '';
  }

  cargarImagen(event:any) {

    console.log(event.target.files);
    let imagen =event.target.files
    let reader= new FileReader();

    reader.readAsDataURL(imagen[0]);
    reader.onprogress=() => {this.loading= true};
    reader.onloadend= ()=>{
      console.log(reader.result)
      this.imagenes.push(reader.result)
      this.storage.subirImagen(this.form.value.nombre + "_" + Date.now(), reader.result).then(urlImagen=>{
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
