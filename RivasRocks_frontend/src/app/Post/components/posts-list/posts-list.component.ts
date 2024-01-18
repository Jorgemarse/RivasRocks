import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts: PostDTO[];
  private userId: string;
  displayedColumns: string[] = [
    // 'image',
    // 'title',
    // 'date',
    // 'location',
    // 'num_participans',
    // 'actions',
    'title',
    'small_description',
    'description',
    'publication_date',
    // 'num_likes',
    // 'num_dislikes',
    // 'actions',
  ];

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.posts = new Array<PostDTO>();

    // this.store.select('auth').subscribe((auth) => {
    //   if (auth.credentials.user_id) {
    //     this.userId = auth.credentials.user_id;
    //   }
    // });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      //console.log('posts', this.posts);
    });

    this.loadPosts();
  }

  private loadPosts(): void {
      this.store.dispatch(
        PostsAction.getPosts()
      );
  }

  createPost(): void {

    this.router.navigateByUrl('/user/post/');
  }

  // updatePost(postId: string): void {
  //   this.router.navigateByUrl('/user/post/' + postId);
  // }

  // deletePost(postId: string): void {
  //   // show confirmation popup
  //   let result = confirm('Confirm delete post with id: ' + postId + ' .');
  //   if (result) {
  //     this.store.dispatch(PostsAction.deletePost({ postId: postId }));
  //   }
  // }
}