// import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let token = localStorage.getItem("token")
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(tokenizedRequest).pipe(
      catchError( (err: HttpErrorResponse) => {
        if( err.status === 401 ){
          this.authService.signOut();
        }
        return throwError(err)
      })
    )
  }
}
