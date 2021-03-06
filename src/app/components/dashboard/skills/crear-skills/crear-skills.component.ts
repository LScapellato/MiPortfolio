import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-crear-skills',
  templateUrl: './crear-skills.component.html',
  styleUrls: ['./crear-skills.component.css'],
})
export class CrearSkillsComponent implements OnInit {
  form: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _skillsService: SkillsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre_habilidad: ['', Validators.required],
      valor: [''],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  openSkDialog() {
    this.dialog.open(CrearSkillsComponent);
  }

  agregarSkill() {
    this._skillsService.saveSkills(this.form.value).subscribe(
      (skill) => {
        
        this._snackBar.open(
          'Se ha Creado Habilidad Correctamente',
          'Habilidad Creada',
          {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
        this.form.reset();
        this.dialog.closeAll();
        this.router.navigate(['/dashboard/inicio'])

      },

      (err) => {
        this.errorMensaje(err);
      }
    );
  }

  private errorMensaje(err: any) {
    console.log(typeof err.status);
    if (err.status === 401) {
      this._snackBar.open('Usuario No Autorizado: ' + err.status, 'Forbidden', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      if (err.status === 403) {
        this._snackBar.open(
          'Usuario Sin Permisos: ' + err.status,
          'Rol Insuficiente',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      } else {
        this._snackBar.open(
          'Verificar Con Administrador: ' + err.status,
          'Error',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    } this.form.reset();
  }
}
