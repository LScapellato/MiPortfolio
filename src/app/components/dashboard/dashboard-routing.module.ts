import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { CrearExperienciaComponent } from './experiencia/crear-experiencia/crear-experiencia.component';
import { ExperienciaEditarComponent } from './experiencia/experiencia-editar/experiencia-editar.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'', component: DashboardComponent, children: [
    {path:'',component: InicioComponent},
    {path:'usuarios',component:UsuariosComponent },
    {path:'reportes',component:ReportesComponent },
    {path:'crear-usuario',component:CrearUsuarioComponent },
    {path: 'experiencia',component:ExperienciaComponent},
    {path:'crear-experiencia',component:CrearExperienciaComponent},
    {path:'experiencia-editar/:id',component:ExperienciaEditarComponent},
    {path: 'estudios',component:EstudiosComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
