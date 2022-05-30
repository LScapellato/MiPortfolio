import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import {
  MatDialog,
 
} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loading = false;
  errMsj?: string;

  //probando form control

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private auth: AuthService,
    public dialog: MatDialog
  ) {
    //inicializamos el formulario
  }
  form = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  ngOnInit(): void {}

  getMensajeErrorUser() {
    const nombreUsuario = this.form.get('nombreUsuario');

    if (nombreUsuario?.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.form.get('nombreUsuario')?.hasError('email')
      ? 'Ingrese email valido'
      : '';
  }

  getMensajeErrorPassword() {
    const password = this.form.get('password');
    if (password?.hasError('required') && password?.touched) {
      return 'Debe ingresar Password';
    }
    return this.form.get('password')?.hasError('minLenght')
      ? ''
      : 'Minimo 8 caracteres';
  }

 

  error() {
    this._snackBar.open('Usuario o contraseña invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // fakeloading() {
  //   this.loading = true;
  //   setTimeout(() => {
  //     //redireccionamos al dashboard
      
  //   }, 5000);
    
  //   //actualizo dashboard para cargar el usuario logueado
  //   window.location.reload();
  // }

  onEnviar(event: Event) {
    event.preventDefault; //
    
    this.auth.IniciarSesion(this.form.value).subscribe(
      (data) => {
        
        this.isLogged = true;
        window.location.reload();
          this.router.navigate(['/dashboard/inicio']);
        

        this._snackBar.open('Bienvenido ' + data.nombreUsuario, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        
        this.dialog.closeAll();
      },
      (err) => {
        this.error();
        this.form.reset();
         this.router.navigate(['inicio']),
        this._snackBar.open('Usuario no existe:' + this.errMsj ,'Fail', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          
        
       
       
        });
      }
    );
  }

  

}
