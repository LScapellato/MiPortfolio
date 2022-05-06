import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler,  HttpHeaders,  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



  

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authservice: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      var currentUser=this.authservice.UsuarioAutenticado;
      const token= 'Bearer ' + currentUser.token;
      
    //transformamos el request obtenemos el token y lo cargamos para
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });

    
    
      
       console.log ("Interceptor corre:" + JSON.stringify(authReq))
       
   return next.handle(authReq);
  }

}
