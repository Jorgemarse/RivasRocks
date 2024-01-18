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
import * as ActivitiesAction from '../../actions';
import { ActivityDTO } from '../../models/activity.dto';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit{
  activity: ActivityDTO;
  title: FormControl;
  small_description: FormControl;
  description: FormControl;
  location: FormControl;
  // num_likes!: FormControl;
  // num_dislikes!: FormControl;
  publication_date: FormControl;
  activity_date: FormControl;
  loading: boolean;

  activityForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private activityId: string | null;


  private userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.userId = '';

    this.isValidForm = null;
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activity = new ActivityDTO('', '', '', '', new Date(), new Date());
    this.isUpdateMode = false;

    this.title = new FormControl(this.activity.title, [
      Validators.required,
      Validators.maxLength(150),
    ]);

    this.location = new FormControl(this.activity.location, [
      Validators.required,
      Validators.maxLength(150),
    ]);

    this.small_description = new FormControl(this.activity.small_description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.description = new FormControl(this.activity.description, [
      Validators.required,
      Validators.maxLength(99999),
    ]);

    this.activity_date = new FormControl(
      formatDate(this.activity.activity_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.publication_date = new FormControl(
      formatDate(this.activity.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    // this.num_likes = new FormControl(this.post.num_likes);
    // this.num_dislikes = new FormControl(this.post.num_dislikes);

    this.activityForm = this.formBuilder.group({
      title: this.title,
      location: this.location,
      small_description: this.small_description,
      description: this.description,
      activity_date: this.activity_date,
      publication_date: this.publication_date,
      // num_likes: this.num_likes,
      // num_dislikes: this.num_dislikes,
    });
    console.log('activityform1: ', this.activityForm.value);

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user['id']) {
        this.userId = auth.credentials.user['id'];
      }
    });

    this.store.select('activities').subscribe((activities) => {
      this.activity = activities.activity;

      this.title.setValue(this.activity.title);
      this.location.setValue(this.activity.location);
      this.small_description.setValue(this.activity.small_description);
      this.description.setValue(this.activity.description);
      this.activity_date.setValue(
        formatDate(this.activity.activity_date, 'yyyy-MM-dd', 'en')
      );
      this.publication_date.setValue(
        formatDate(this.activity.publication_date, 'yyyy-MM-dd', 'en')
      );
      // this.num_likes.setValue(this.post.num_likes);
      // this.num_dislikes.setValue(this.post.num_dislikes);

      this.activityForm = this.formBuilder.group({
        title: this.title,
        location: this.location,
        small_description: this.small_description,
        description: this.description,
        activity_date: this.activity_date,
        publication_date: this.publication_date,
        // num_likes: this.num_likes,
        // num_dislikes: this.num_dislikes,
      });
      console.log('activityform2: ', this.activityForm.value);
    });
    this.loading = false;

  }

  ngOnInit(): void {
    //this.publication_date.disable();
    this.loading = false;
    if (this.activityId) {
      console.log('editando');
      this.isUpdateMode = true;
      this.store.dispatch(ActivitiesAction.getActivityById({ activityId: this.activityId }));
    } else {
      console.log('activityForm NO reset: ', this.activityForm.value);
      this.activityForm.reset();
      console.log('activityForm reset: ', this.activityForm.value);
      this.publication_date.setValue(
        formatDate(this.activity.publication_date, 'yyyy-MM-dd', 'en')
      );
    }
  }

  private editActivity(): void {
    if (this.activityId) {
        this.activity.userId = this.userId;

        this.store.dispatch(
          ActivitiesAction.updateActivity({
            activityId: this.activityId,
            activity: this.activity,
          })
        );
      
      }
    }
  

  private createActivity(): void {
    
    this.store.dispatch(ActivitiesAction.createActivity({ activity: this.activity }));

  }

      
  

  saveActivity(): void {
    this.isValidForm = false;

    if (this.activityForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.activity = this.activityForm.value;
    console.log(this.activity);

    if (this.isUpdateMode) {
      console.log('editActivity')
      this.editActivity();
    } else {
      this.createActivity();
    }
    this.loading = true;
  }
}
