import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ActivityAction from '../../../Activity/actions';
import { ActivityDTO } from '../../../Activity/models/activity.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent {
  activity: ActivityDTO;
  showAuthSection: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    this.activity = new ActivityDTO('', '', '', '', new Date(), new Date());
    this.showAuthSection = false;

    this.store.select('auth').subscribe((auth) => {
      const admin = localStorage.getItem('admin');
      if (auth.credentials.access_token && admin != '1' ) {
        this.showAuthSection = true;
      }
    });
    
    this.store.select('activities').subscribe((activities) => {
      this.activity = activities.activity;
    });

    this.loadActivity();
  }
  addUser(): void {
    let result = confirm('¿Estás seguro que quieres inscribirte en esta actividad?');
    if (result) {
      const userId = localStorage.getItem('userId');
      const activityId = this.route.snapshot.paramMap.get('id');
      if(userId && activityId){
        console.log(userId, activityId)
        this.store.dispatch(ActivityAction.addUser({ userxactivity: { user_id: userId, activity_id: activityId } }));
      }
    }
  }

  private loadActivity(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.store.dispatch(
        ActivityAction.getActivityById({ activityId: id })
      );
    }
  }
}
