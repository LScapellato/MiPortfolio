import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CrearExperienciaComponent } from './experiencia/crear-experiencia/crear-experiencia.component';
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
    {path:'crear-experiencia/:id',component:CrearExperienciaComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
