import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  // private API_SERVER = 'http://localhost:8080/personas/'
  private API_SERVER = 'https://bemiportfolio.herokuapp.com/personas/';

  constructor(private http: HttpClient) {}

  public getPerson(): Observable<any> {
    return this.http.get(this.API_SERVER + 'traer');
    
  }
  public savePerson(persona: any): Observable<any> {
    return this.http.post(this.API_SERVER + 'crear', persona)
    ;
      
  }

  public deletePerson(id: number): Observable<any> {
    return this.http.delete(this.API_SERVER + 'borrar/' + id);
    
  }

  public updatePersona(id: number, persona:string): Observable<any> {
    return this.http.put(this.API_SERVER + 'editar/'+ id, persona)
  }

  public getPersonaDetalle(id: any): Observable<any> {
    return this.http.get(this.API_SERVER + 'detalle/'+ id)
  }
  
}
