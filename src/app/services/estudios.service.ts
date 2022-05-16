import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {
  private API_SERVER = 'http://localhost:8080/educacion/'

  constructor(private http: HttpClient) { }

  public getEstudios(): Observable<any> {
    return this.http.get(this.API_SERVER + 'traer');
  }

  public getEstudioDetalle(id: number): Observable<any> {
    return this.http.get(this.API_SERVER + 'detalle/'+ id )
  }

  public saveEstudio(estudio: any): Observable<any> {
    return this.http.post(this.API_SERVER + 'crear', estudio)
  }

  public updateEstudio(id: number, estudio: string): Observable<any> {
    return this.http.put(this.API_SERVER + 'editar/' + id, estudio)

  }

  public deleteEstudio(id: number): Observable<any> {
    return this.http.delete(this.API_SERVER + 'borrar/'+ id)
  }


}
