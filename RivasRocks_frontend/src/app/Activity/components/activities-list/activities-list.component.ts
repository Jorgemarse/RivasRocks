import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ActivityDTO } from '../../models/activity.dto';
import * as ActivityAction from '../../actions';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent {
  activities: ActivityDTO[]
  


  constructor(private router: Router, private store: Store<AppState>) {
    this.activities = new Array<ActivityDTO>();
    

    this.store.select('activities').subscribe((activities) => {
      this.activities = activities.activities;
    });

    this.loadActivities();
  }

  private loadActivities(): void {
    this.store.dispatch(
      ActivityAction.getActivities()
    );
  }

  createActivity(): void {
    this.router.navigateByUrl('/user/activity/');
  }

}
