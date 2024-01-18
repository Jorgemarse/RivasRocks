import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostsAction from '../../../Post/actions';
import * as ActivityAction from '../../../Activity/actions';
import { PostDTO } from '../../../Post/models/post.dto';
import { ActivityDTO } from '../../../Activity/models/activity.dto';
import { PostService } from '../../../Post/services/post.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class HomeComponent {
  posts: PostDTO[];
  activities: ActivityDTO[];
  showButtons: boolean;
  //loading: boolean;

  private userId: string;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    //this.loading = false;
    this.userId = '';
    this.posts = new Array<PostDTO>();
    this.activities = new Array<ActivityDTO>();
    this.showButtons = false;

    this.store.select('auth').subscribe((auth) => {
      

      // if (auth.credentials.user.id) {
      //   this.userId = auth.credentials.user.id;
      // }
      // if (auth.credentials.access_token) {
      //   this.showButtons = true;
      // }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
    this.store.select('activities').subscribe((activities) => {
      this.activities = activities.activities;
    });
  }

  ngOnInit(): void {

    
    this.loadPosts();
    this.loadActivities();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
  private loadActivities(): void {
    this.store.dispatch(
      ActivityAction.getActivities()
    );
  }
}
