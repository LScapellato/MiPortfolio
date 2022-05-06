import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Experiencia } from '../interfaces/experiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private API_SERVER = 'http://localhost:8080/experiencia/';

  constructor(private http: HttpClient) {}

  public getExperiencia(): Observable<any> {
    return this.http.get(this.API_SERVER + 'traer');
  }

  public getDetalle(id:number): Observable<any> {
    return this.http.get(this.API_SERVER + 'detalle/'+ id)
  }

  public saveExperiencia(experiencia: any): Observable<any> {
    return this.http.post(this.API_SERVER + 'crear', experiencia);
  }

  public updateExperiencia(id: number, experiencia: string): Observable<any> {
    console.log(this.API_SERVER + 'editar/'+ id, experiencia)
    return this.http.put(this.API_SERVER + 'editar/'+ id, experiencia);
   
  }

  public deleteExperiencia(id: number): Observable<any> {
    console.log(this.API_SERVER + 'borrar/' + id )
  
    return this.http.delete(this.API_SERVER + 'borrar/'+ id );
    
  }

}

