import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: FormControl;
  small_description: FormControl;
  description: FormControl;
  // num_likes!: FormControl;
  // num_dislikes!: FormControl;
  publication_date: FormControl;
  // categories!: FormControl;
  loading: boolean;

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private postId: string | null;


  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';

    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', '', new Date());
    this.isUpdateMode = false;

    this.title = new FormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(150),
    ]);

    this.small_description = new FormControl(this.post.small_description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.description = new FormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(5000),
    ]);

    this.publication_date = new FormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    // this.num_likes = new FormControl(this.post.num_likes);
    // this.num_dislikes = new FormControl(this.post.num_dislikes);

    // this.categories = new FormControl([]);

    this.postForm = this.formBuilder.group({
      title: this.title,
      small_description: this.small_description,
      description: this.description,
      publication_date: this.publication_date,
      // categories: this.categories,
      // num_likes: this.num_likes,
      // num_dislikes: this.num_dislikes,
    });
    console.log('postform1: ', this.postForm.value);

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user['id']) {
        this.userId = auth.credentials.user['id'];
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.post = posts.post;

      this.title.setValue(this.post.title);
      this.small_description.setValue(this.post.small_description);
      this.description.setValue(this.post.description);
      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );
      // this.num_likes.setValue(this.post.num_likes);
      // this.num_dislikes.setValue(this.post.num_dislikes);

      this.postForm = this.formBuilder.group({
        title: this.title,
        small_description: this.small_description,
        description: this.description,
        publication_date: this.publication_date,
        // categories: this.categories,
        // num_likes: this.num_likes,
        // num_dislikes: this.num_dislikes,
      });
      console.log('postform2: ', this.postForm.value);
    });
    this.loading = false;

  }


  ngOnInit(): void {
    this.loading = false;
    if (this.postId) {
      console.log('editando');
      this.isUpdateMode = true;
      this.store.dispatch(PostsAction.getPostById({ postId: this.postId }));
    } else {
      console.log('postform NO reset: ', this.postForm.value);
      this.postForm.reset();
      console.log('postform reset: ', this.postForm.value);
      this.publication_date.setValue(
        formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
      );
    }
  }

  private editPost(): void {
    if (this.postId) {
        this.post.userId = this.userId;

        this.store.dispatch(
          PostsAction.updatePost({
            postId: this.postId,
            post: this.post,
          })
        );
      
      }
    }
  

  private createPost(): void {
    console.log('post2:', this.post);
    this.store.dispatch(PostsAction.createPost({ post: this.post }));

  }

      
  

  savePost(): void {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;
    console.log('post1:', this.post);

    if (this.isUpdateMode) {
      console.log('editPost')
      this.editPost();
    } else {
      this.createPost();
    }
    this.loading = true;
  }
}
