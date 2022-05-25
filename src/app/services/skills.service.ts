import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  
  // private API_SERVER = 'http://localhost:8080/skills/'
  
  
  private API_SERVER = 'https://bemiportfolio.herokuapp.com/skills/';
  
  constructor(private http: HttpClient) { }


  public getSkills(): Observable<any> {
    return this.http.get(this.API_SERVER + 'traer');
  }

  public getSkillsDetalle(id:number): Observable<any> {
    return this.http.get(this.API_SERVER + 'detalle/'+ id)
  }

  public saveSkills(skills: any): Observable<any> {
    return this.http.post(this.API_SERVER + 'crear', skills);
  }

  public updateSkills(id: number, skills: string): Observable<any> {
    
    return this.http.put(this.API_SERVER + 'editar/'+ id, skills);
   
  }

  public deleteSkills(id: number): Observable<any> {
    console.log(this.API_SERVER + 'borrar/' + id )
  
    return this.http.delete(this.API_SERVER + 'borrar/'+ id );
    
  }


}
