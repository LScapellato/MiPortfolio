import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';let AUTHORITIES_KEY = 'AuthAuthorities'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_SERVER = 'http://localhost:8080/auth/login';
  currentUserSubject: BehaviorSubject <any>;// maneja el estado 
  roles!: [] ;
  constructor(private httpClient: HttpClient){
    // console.log("Servicio Auth está corriendo");
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'))
  

  
}
  IniciarSesion(credenciales:any):Observable<any> {
    return this.httpClient.post(this.API_SERVER,credenciales).pipe(map(data=>{
      //usamos storage para almacenar objetos en este caso el token local storage o sesion storage
      
      
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      
      return data;
    }))
  }

  get UsuarioAutenticado() {

    return this.currentUserSubject.value;

  }

  public getAuthorities() {
     window.sessionStorage.getItem('CurrentUser')
    console.log(window.sessionStorage.getItem('currentUser'));
  }

}
