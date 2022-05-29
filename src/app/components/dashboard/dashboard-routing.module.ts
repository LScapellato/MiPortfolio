import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from 'src/app/services/guard.guard';
import { DashboardComponent } from './dashboard.component';
import { EditarEstudioComponent } from './estudios/editar-estudio/editar-estudio.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { CrearExperienciaComponent } from './experiencia/crear-experiencia/crear-experiencia.component';
import { ExperienciaEditarComponent } from './experiencia/experiencia-editar/experiencia-editar.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { DialogoComponent } from './inicio/dialogo/dialogo.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ReportesComponent } from './proyectos/reportes.component';
import { EditarSkillsComponent } from './skills/editar-skills/editar-skills.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  
    {path:'', component: DashboardComponent, children: [
    
    {path:'inicio',component: InicioComponent},
    {path: 'proyectos/:id',component: ProyectosComponent},
    {path:'usuarios',component:UsuariosComponent },
    {path:'reportes',component:ReportesComponent },
    {path:'crear-usuario/:id',component:CrearUsuarioComponent, canActivate: [GuardGuard] },
    {path: 'experiencia',component:ExperienciaComponent},
    {path:'crear-experiencia',component:CrearExperienciaComponent,canActivate: [GuardGuard]},
    {path:'experiencia-editar/:id',component:ExperienciaEditarComponent, canActivate: [GuardGuard]},
    {path: 'estudios',component:EstudiosComponent},
    {path: 'editar-skills/:id' ,component: EditarSkillsComponent ,canActivate: [GuardGuard]},
    {path: 'editar-estudio/:id', component: EditarEstudioComponent, canActivate: [GuardGuard]},
    {path: 'dialogo/', component: DialogoComponent,canActivate: [GuardGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
