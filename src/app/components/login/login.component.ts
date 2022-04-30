import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/services/auth.service';

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
    private auth: AuthService
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

  // Creamos propiedades para obtener usuario y password
  // get Email()
  // {
  //   return this.form.get('email')
  // }

  // get Password()
  // {
  //   return this.form.get('password')
  // }

  getMensajeError() {
    const nombreUsuario = this.form.get('nombreUsuario');

    if (nombreUsuario?.hasError('required')) {
      return 'Debe ingresar un email';
    }
    return this.form.get('nombreUsuario')?.hasError('email')
      ? 'Ingrese email valido'
      : '';
  }

  ingresar() {
    if (
      this.form.value.email == 'admin@l' &&
      this.form.value.password == 'admin123'
    ) {
      this.fakeloading();
      //redireccionamos al dashboard
    } else {
      this.error();
      this.form.reset();
    }
  }

  error() {
    this._snackBar.open('Usuario o contraseña invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;

      //redireccionamos al dashboard
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

  onEnviar(event: Event) {
    event.preventDefault; //
    //borrar esto muestra la clave ????
    //console.log("miconsole" + JSON.stringify(this.form.value))
    this.auth.IniciarSesion(this.form.value).subscribe(
      (data) => {
        console.log("DATA:" + JSON.stringify(data));
        this.isLogged = true;
        this._snackBar.open('Bienvenido ' + data.nombreUsuario, 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.status;
        console.log(this.errMsj);
        // this._snackBar.open('Usuario no existe:' + this.errMsj ,'FAil', {
        //   duration: 3000,
        //   horizontalPosition: 'center',
        //   verticalPosition: 'bottom',
        // });
      }
    );
  }
}
