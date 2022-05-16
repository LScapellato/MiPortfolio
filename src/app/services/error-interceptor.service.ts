/*
TODO : Construyendo el interceptor para recibir los mensajes de Back end

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router,) {}
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    return next.handle(request).pipe(catchError((err) => {
        if (err.status === 401) {
          console.log("en el catch");
        }
        const error =err.error.message

        console.log(error.text)
      }))
      
    }
      
      
}  */