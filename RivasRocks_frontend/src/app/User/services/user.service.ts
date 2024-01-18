import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { UserDTO } from '../models/user.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  base = environment.base;
  

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  register(user: UserDTO) {
    return this.http
      .post<UserDTO>(this.base + 'register', user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    console.log(this.base + 'user/' + userId, user);
    return this.http
      .put<UserDTO>(this.base + 'updateuser/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    console.log('profile servicio');
    return this.http
      .get<UserDTO>(this.base + 'user')
      .pipe(catchError(this.sharedService.handleError));
  }

  getUsersById(userIds: string[]): Observable<UserDTO[]> {
    console.log('profile servicio');
    return this.http
      .get<UserDTO[]>(this.base + 'user')
      .pipe(catchError(this.sharedService.handleError));
  }

  getUsersByActivityId(activityId: string): Observable<UserDTO[]> {
    console.log(this.base + 'getusersbyactivity/' + activityId);
    return this.http
      .get<UserDTO[]>(this.base + 'getusersbyactivity/' + activityId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
