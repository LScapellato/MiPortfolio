import { Component, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  @Output() idActual?: number;

  public get skills(): any {
    return this._skills;
  }

  constructor(
    private _skillsService: SkillsService,
    public _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarSkills();
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

    this.router.navigate(['/dashboard/skills-editar/' + id]);
  }

  openCrearSkills() {
    //Pasamos nuestro componente del contenido que queremos pasar al modal
    this.dialog.open(CrearSkillsComponent);
  }
}
