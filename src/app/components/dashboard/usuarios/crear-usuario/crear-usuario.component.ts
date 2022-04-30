import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {





  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  //sexo: any[] = ['Masculino','Femenino']
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {


    this.form = this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      domicilio: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: [''],
      mail: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  agregarUsuario() {




    /*const user: Usuario = {
      
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      edad: this.form.value.edad,*/

    this._usuarioService.savePerson(this.form.value).subscribe(data => {
      this.router.navigate(['/dashboard/usuarios'])

      this._snackBar.open('Usuario Creado Correctamente', '',
        { duration: 1500, horizontalPosition: 'center', verticalPosition: 'bottom' })
      this.form.reset()
    });
  }

  volver() {
    this.router.navigate(['/dashboard/usuarios'])
  }







  getErrorMessage() {
    if (this.form.get('mail')?.hasError('required')) {
      return 'Debe ingresar un email';
    }

    return this.form.get('mail')?.hasError('mail') ? 'No es un email valido' : '';
  }


}
