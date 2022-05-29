import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // private API_SERVER = 'http://localhost:8080/auth/login'
  private API_SERVER = 'https://bemiportfolio.herokuapp.com/auth/login';
  currentUserSubject: BehaviorSubject<any>; // maneja el estado
  roles!: [];
  isAdmin = false;
  rolActual = '';
  isInvitado = true;

  constructor(private httpClient: HttpClient) {
    // console.log("Servicio Auth está corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }
  IniciarSesion(credenciales: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, credenciales).pipe(
      map((data) => {
        //usamos storage para almacenar objetos en este caso el token local storage o sesion storage

        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);

        return data;
      })
    );
  }

  get UsuarioAutenticado() {
    
    return this.currentUserSubject.value;
    
  }

  public getAuthorities() {
    window.sessionStorage.getItem('CurrentUser');
    // console.log(window.sessionStorage.getItem('currentUser'));
  }

  public Rol() {
    this.roles = this.UsuarioAutenticado.authorities;

    if (JSON.stringify(this.roles) !== undefined) {
      if (JSON.stringify(this.roles).includes('ROLE_ADMIN')) {
        return 'Administrador';
      } else {
        !JSON.stringify(this.roles).includes('ROLE_ADMIN') &&
          JSON.stringify(this.roles).includes('ROLE_USER');
        return 'Usuario';
      }
    } else {
      return 'Invitado';
    }
  }

  
  async logOut()  {
   //borro los datos de la sesion
    window.sessionStorage.clear();
     //quiero actualizar el navegador para que se borren las credenciales con reload() pierdo la ruta de la app. y encontre este metodo para iniciar de nuevo
    window.location.assign('https://miportfolioimg.web.app');
    
    
    //esto generaba que no redirija el logout
    // window.location.reload();     http://localhost:4200
  }
}
