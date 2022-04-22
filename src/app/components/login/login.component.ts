import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loading = false;

  //probando form control
  
    

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    //inicializamos el formulario
   
  }
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    })
  ngOnInit(): void {
  }


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
   const email = this.form.get('email')
   
    if(email?.hasError('required')) {
      return "Debe ingresar un email";
    }
    return this.form.get('email')?.hasError('email') ? "Ingrese email valido" : '';
  }



  ingresar() {

    

    if (this.form.value.email == 'admin@l' && this.form.value.password == "admin123") {
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
      verticalPosition: 'bottom'
    })
  }

  fakeloading() {
    this.loading = true; setTimeout(() => {
      this.loading = false;

      //redireccionamos al dashboard
      this.router.navigate(['/dashboard']);


    }, 3000);}


   
   
    }
  



  
