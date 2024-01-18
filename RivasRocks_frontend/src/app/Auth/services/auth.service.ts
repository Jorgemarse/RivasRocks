import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AuthDTO } from '../models/auth.dto';
import { environment } from 'src/environments/environment.prod';

export interface AuthToken {
  user_id: string;
  access_token: string;
  user: object;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  base = environment.base;
  authChanged = new Subject<void>();

  constructor(private http: HttpClient, private sharedService: SharedService) {

  }

  login(auth: AuthDTO): Observable<AuthToken> {
    console.log(this.base + 'login');
    return this.http
      .post<AuthToken>(this.base + 'login', auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  notifyAuthChanged() {
    this.authChanged.next();
  }

}
