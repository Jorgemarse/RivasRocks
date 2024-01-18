import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { PostDTO } from '../models/post.dto';
import { environment } from '../../../environments/environment';

interface updateResponse {
  affected: number;
}

interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  base = environment.base;
  // private urlBlogUocApi: string;
  // private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    // this.controller = 'posts';
    // this.urlBlogUocApi = 'http://localhost:3000/' + this.controller;
  }
  getPosts(): Observable<PostDTO[]> {
    return this.http
      .get<PostDTO[]>(this.base + 'posts')
      .pipe(catchError(this.sharedService.handleError));
  }

  createPost(post: PostDTO): Observable<PostDTO> {
    console.log(this.base + 'createpost');
    console.log('post service:', post);
    return this.http
      .post<PostDTO>(this.base + 'createpost', post)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPostById(postId: string): Observable<PostDTO> {
    return this.http
      .get<PostDTO>(this.base + 'post/' + postId)
      .pipe(catchError(this.sharedService.handleError));
  }

  updatePost(postId: string, post: PostDTO): Observable<PostDTO> {
    console.log(this.base + 'updatepost/' + postId, post);
    return this.http
      .put<PostDTO>(this.base + 'updatepost/' + postId, post)
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

  deletePost(postId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.base + 'deletepost/' + postId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
