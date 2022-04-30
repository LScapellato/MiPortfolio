import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authservice: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //transformamos el request obtenemos el token y lo cargamos para
    var currentUser=this.authservice.UsuarioAutenticado;
    
    if(currentUser.token! == {})
    {
      req=req.clone({

        setHeaders:{
          Authorization: 'Bearer '+ currentUser.token
        }
      })
    }

    
    return next.handle(req);
  }

}
