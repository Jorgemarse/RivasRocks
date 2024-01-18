import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ActivityDTO } from '../../models/activity.dto';
import * as ActivityAction from '../../actions';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent {
  activities: ActivityDTO[];

  constructor(private store: Store<AppState>) {
    this.activities = new Array<ActivityDTO>();

    this.loadActivities();
  }

  private loadActivities(): void {
    const userId = localStorage.getItem('userId');
    if(userId){
      this.store.dispatch(
        ActivityAction.getActivitiesByUserId({ userId: userId })
      );
    }
    this.store.select('activities').subscribe((activities) => {
      this.activities = activities.activities;
    });
  } 

}
