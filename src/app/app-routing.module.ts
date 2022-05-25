import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienciaComponent } from './components/dashboard/experiencia/experiencia.component';
import { InicioComponent } from './components/dashboard/inicio/inicio.component';

import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [ 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent},

  //carga perezosa lazy load 
  { path: 'dashboard', loadChildren: () => 
  import('./components/dashboard/dashboard.module').then (x => x.DashboardModule)},
  { path: '**', component: NotfoundComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
