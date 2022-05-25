import { Component, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SkillsService } from 'src/app/services/skills.service';
import { CrearSkillsComponent } from './crear-skills/crear-skills.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 25;

  listskills: any;
  private _skills: any;
  tipo: string | undefined;
  isAdmin = false;
  rolActual = '';
  isInvitado = true;
  @Output() idActual?: number;

  public get skills(): any {
    return this._skills;
  }

  constructor(
    private _skillsService: SkillsService,
    public _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.cargarSkills();
    this.rol();
  }

  cargarSkills() {
    this._skillsService.getSkills().subscribe((data) => {
      this.listskills = data;
    });
  }

  borrarSkill(id: number) {
    this._skillsService.deleteSkills(id).subscribe((data) => {
      this._snackBar.open('Habilidad Eliminada', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.cargarSkills();
    });
  }

  detalleSkills(id: number) {
    this.idActual = id;
    console.log(id)
    this.router.navigate(['/dashboard/editar-skills/' + id]);
  }
  convertir(value: number) { this.value = value*3.60 
    

  }
  openCrearSkills() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
   const dialogRef= this.dialog.open(CrearSkillsComponent);

   dialogRef.afterClosed().subscribe(result => {
     this.cargarSkills();
   })
  }
  ///TODO REPITO EL CODIGO VER COMO RESOLVER
  rol() {
    this.rolActual = this.auth.Rol();

    if (this.rolActual !== 'Administrador' && this.rolActual !== 'Usuario') {
      this.isAdmin = false;
      this.isInvitado = true;
    } else {
      if (this.rolActual == 'Administrador') this.isAdmin = true;
      this.isInvitado = false;
    }
  }

 
}
