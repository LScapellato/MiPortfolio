import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './proyectos/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { DialogoComponent } from './inicio/dialogo/dialogo.component';
import { ExperienciaComponent} from './experiencia/experiencia.component';
import { CrearExperienciaComponent } from './experiencia/crear-experiencia/crear-experiencia.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { ExperienciaEditarComponent } from './experiencia/experiencia-editar/experiencia-editar.component';
import { SkillsComponent } from './skills/skills.component';
import { CrearSkillsComponent } from './skills/crear-skills/crear-skills.component';
import { EditarSkillsComponent } from './skills/editar-skills/editar-skills.component';
import { CrearEstudioComponent } from './estudios/crear-estudio/crear-estudio.component';
import { EditarEstudioComponent } from './estudios/editar-estudio/editar-estudio.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CrearProyectosComponent } from './proyectos/crear-proyectos/crear-proyectos.component'
 

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    UsuariosComponent,
    ReportesComponent,
    CrearUsuarioComponent,
    DialogoComponent,
    ExperienciaComponent,
    CrearExperienciaComponent,
    EstudiosComponent,
    ExperienciaEditarComponent,
    SkillsComponent,
    CrearSkillsComponent,
    EditarSkillsComponent,
    CrearEstudioComponent,
    EditarEstudioComponent,
    ProyectosComponent,
    CrearProyectosComponent,
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    
    
   
 
  ]
})
export class DashboardModule { }
