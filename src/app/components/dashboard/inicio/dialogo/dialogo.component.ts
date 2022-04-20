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

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css'],
})
export class DialogoComponent implements OnInit {
  age: any;
  showAge: any;
  mail = new FormControl('', [Validators.required, Validators.email]);
  today: number = Date.now();

  form: FormGroup;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(DialogoComponent, dialogConfig);
  }

  ngOnInit(): void {}
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

  calculoEdad(): number {
    console.log(this.today);
    var fecha = this.form.value.fecha_nacimiento;
    this.age = fecha;
    console.log('fecha:' + this.age);
    if (this.form.value.fecha_nacimiento) {
      var timeDiff = Math.abs(Date.now() - this.form.value.fecha_nacimiento);
      console.log('timediff:' + timeDiff);
      console.log('Años:' + Math.ceil(timeDiff / (1000 * 3600 * 24) / 365));
      return Math.ceil(timeDiff / (1000 * 3600 * 24) / 365);
    } else {
      return 0;
    }
  }
}
