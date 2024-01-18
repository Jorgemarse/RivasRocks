import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostAction from '../../actions';
import { ActivatedRoute } from '@angular/router';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  post: PostDTO;
  loading: boolean;

  showAuthSection: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    this.post = new PostDTO('', '', '', new Date());
    this.showAuthSection = false;
    this.loading = true;

    this.store.select('auth').subscribe((auth) => {
      const admin = localStorage.getItem('admin');
      if (auth.credentials.access_token && admin != '1' ) {
        this.showAuthSection = true;
      }
    });
    
    this.store.select('posts').subscribe((posts) => {
      this.post = posts.post;
    });

    this.loadPost();
    this.loading = false;
  }

  private loadPost(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.store.dispatch(
        PostAction.getPostById({ postId: id })
      );
    }
  }

}
