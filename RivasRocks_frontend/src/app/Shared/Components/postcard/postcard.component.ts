import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../../Post/actions';
import * as ActivityAction from '../../../Activity/actions';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss'],
})
export class PostCardComponent {
  @Input() title: string | undefined;
  @Input() publication_date: Date | undefined;
  @Input() Id: string;
  @Input() location: string | undefined;
  @Input() activity_date: Date | undefined;
  @Input() showButtons: boolean | undefined;

  constructor(private router: Router, private store: Store<AppState>) {
    this.Id = '';
  }
  //post
  updatePost(): void {
    this.router.navigateByUrl('/user/post/' + this.Id);
  }

  deletePost(): void {
    console.log('deletePost');
    let result = confirm('¿Estás seguro que quieres eliminar esta noticia?');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: this.Id }));
    }
  }
  viewPost(): void {
    this.router.navigateByUrl('/post/view/' + this.Id);
  }
  //Activity
  updateActivity(): void {
    this.router.navigateByUrl('/user/activity/' + this.Id);
  }

  deleteActivity(): void {
    console.log('deleteActivity');
    let result = confirm('¿Estás seguro que quieres eliminar esta actividad?');
    if (result) {
      this.store.dispatch(ActivityAction.deleteActivity({ activityId: this.Id }));
    }
  }

  viewActivity(): void {
    this.router.navigateByUrl('/activity/view/' + this.Id);
  }
}
