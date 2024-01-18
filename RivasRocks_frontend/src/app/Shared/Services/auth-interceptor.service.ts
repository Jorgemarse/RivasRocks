import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app.reducers';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  private access_token: string = '';
  private admin: number = 0;
  private userId: number = 0;
  

  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe((auth) => {
      this.access_token = '';
      this.admin = 0;
      this.userId = 0;
      if (auth.credentials.access_token) {
        this.access_token = auth.credentials.access_token;
        this.admin = auth.credentials.user['Admin'];
        this.userId = auth.credentials.user['id'];
        
        const token = localStorage.getItem('access_token');
        const admin = localStorage.getItem('admin');
        if(!token && !admin){
          //console.log("entra");
          localStorage.setItem('access_token', this.access_token);
          localStorage.setItem('admin', this.admin.toString());
          localStorage.setItem('userId', this.userId.toString());
        }
      }
      //console.log(auth.credentials);
    });


   }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.access_token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.access_token}`,
        },
      });
    }
    return next.handle(req);
  }
}
