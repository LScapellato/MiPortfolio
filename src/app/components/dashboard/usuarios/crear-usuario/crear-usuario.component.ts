import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MatDialog} from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  
  age: any;
  showAge: any;
  mail = new FormControl('',[ Validators.required,Validators.email]);
  today: number = Date.now()
  
  
  getErrorMessage() {
    if (this.mail.hasError('required')) {
      return 'Debe ingresar un email';
    }

    return this.mail.hasError('email') ? 'No es un email valido' : '';
  }

  tiles: any[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  //sexo: any[] = ['Masculino','Femenino']
  form: FormGroup;

  constructor(private fb: FormBuilder,
             private _usuarioService: UsuarioService,
             private router: Router,
             private _snackBar: MatSnackBar,
             public dialog: MatDialog) { 
    
    
              this.form = this.fb.group({
      
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      edad:['', Validators.required],
      domicilio:['', Validators.required],
      fecha_nacimiento:['', Validators.required],
      telefono:[''],
      mail:['', Validators.required],
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

    this._snackBar.open('Usuario Creado Correctamente','',
    {duration:1500, horizontalPosition:'center', verticalPosition:'bottom'})
    this.form.reset()
  });
  }

  volver() {
    this.router.navigate(['/dashboard/usuarios'])
  }

  calculoEdad(): number {

    
    console.log(this.today)
    var fecha  = (this.form.value.fecha_nacimiento)
    this.age = fecha
    console.log("fecha:" + this.age)
    if(this.form.value.fecha_nacimiento) {
     
    var timeDiff = Math.abs(Date.now()- (this.form.value.fecha_nacimiento))
     console.log("timediff:"+ timeDiff)
     console.log("Años:" + Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365));
     return  Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
     
     
    } else {
      return 0;
    }
    
    
  }
  ageCalculator(){
    if(this.age){
      const convertAge = new Date(this.age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      console.log("Años" + Math.floor((timeDiff / (1000 * 3600 * 24))/365))
    }
  }
}
