import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { ActivityDTO } from '../models/activity.dto';
import { environment } from '../../../environments/environment';
import { UserXActivityDTO } from 'src/app/Shared/Models/userXactivity.dto';
import { HttpParams } from '@angular/common/http';
import { UserDTO } from 'src/app/User/models/user.dto';

interface updateResponse {
  affected: number;
}

interface deleteResponse {
  affected: number;
}
interface addResponse {
  affected: number;
}



@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  base = environment.base;

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getActivities(): Observable<ActivityDTO[]> {
    return this.http
      .get<ActivityDTO[]>(this.base + 'activities')
      .pipe(catchError(this.sharedService.handleError));
  }

  createActivity(activity: ActivityDTO): Observable<ActivityDTO> {
    console.log(this.base + 'createactivity');
    console.log(activity);
    return this.http
      .post<ActivityDTO>(this.base + 'createactivity', activity)
      .pipe(catchError(this.sharedService.handleError));
  }

  getActivityById(activityId: string): Observable<ActivityDTO> {
    return this.http
      .get<ActivityDTO>(this.base + 'activity/' + activityId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateActivity(activityId: string, activity: ActivityDTO): Observable<ActivityDTO> {
    console.log(this.base + 'updateactivity/' + activityId, activity);
    return this.http
      .put<ActivityDTO>(this.base + 'updateactivity/' + activityId, activity)
      .pipe(catchError(this.sharedService.handleError));
  }
    // likePost(postId: string): Observable<updateResponse> {
  //   return this.http
  //     .put<updateResponse>(this.urlBlogUocApi + '/like/' + postId, NONE_TYPE)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // dislikePost(postId: string): Observable<updateResponse> {
  //   return this.http
  //     .put<updateResponse>(this.urlBlogUocApi + '/dislike/' + postId, NONE_TYPE)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  deleteActivity(activityId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.base + 'deleteactivity/' + activityId)
      .pipe(catchError(this.sharedService.handleError));
  }

  addUser(userxactivity: UserXActivityDTO): Observable<addResponse> {
    console.log(this.base + 'adduser', userxactivity);
    return this.http
      .post<addResponse>(this.base + 'adduser', userxactivity)
      .pipe(catchError(this.sharedService.handleError));
  }

  removeUser(userxactivity: UserXActivityDTO): Observable<updateResponse> {
    console.log(this.base + 'removeuser', userxactivity)
    return this.http
      .post<updateResponse>(this.base + 'removeuser', userxactivity)
      .pipe(catchError(this.sharedService.handleError));
  }

  getActivitiesByUserId(userId: string): Observable<ActivityDTO[]> {
    return this.http
      .get<ActivityDTO[]>(this.base + 'getactivitiesbyuser/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
