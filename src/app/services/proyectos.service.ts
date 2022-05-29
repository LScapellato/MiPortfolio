import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private API_SERVER = 'https://bemiportfolio.herokuapp.com/proyectos/';
  
  constructor(private http: HttpClient) { }


  public getProyectos(): Observable<any> {
    return this.http.get(this.API_SERVER + 'traer');
  }

  public getProyectosDetalle(id:number): Observable<any> {
    return this.http.get(this.API_SERVER + 'detalle/'+ id)
  }

  public saveProyectos(proyecto: any): Observable<any> {
    return this.http.post(this.API_SERVER + 'crear', proyecto);
  }

  public updateProyectos(id: number, proyecto: string): Observable<any> {
    
    return this.http.put(this.API_SERVER + 'editar/'+ id, proyecto);
   
  }

  public deleteProyectos(id: number): Observable<any> {
    console.log(this.API_SERVER + 'borrar/' + id )
  
    return this.http.delete(this.API_SERVER + 'borrar/'+ id );
    
  }
}
