import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { DialogoComponent } from './inicio/dialogo/dialogo.component';
import { ExperienciaComponent} from './experiencia/experiencia.component';
import { CrearExperienciaComponent } from './experiencia/crear-experiencia/crear-experiencia.component';
import { EstudiosComponent } from './estudios/estudios.component'
 

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
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    
    
   
 
  ]
})
export class DashboardModule { }
