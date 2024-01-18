import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ActivityAction from '../../../Activity/actions';
import { ActivityDTO } from '../../../Activity/models/activity.dto';

@Component({
  selector: 'app-activitygrid',
  templateUrl: './activitygrid.component.html',
  styleUrls: ['./activitygrid.component.scss']
})
export class ActivityGridComponent {
  @Input() title: string | undefined;
  @Input() location: string | undefined;
  @Input() activity_date: Date | undefined;
  @Input() small_description: string | undefined;
  @Input() participants: number | undefined;
  @Input() Id: string;

  showAuthSection: boolean;

  constructor(private router: Router, private store: Store<AppState>) {
    this.Id = '';
    this.showAuthSection = false;


    const userId = localStorage.getItem('userId');
    if(userId && this.Id){


    }
    this.store.select('auth').subscribe((auth) => {
      const admin = localStorage.getItem('admin');
      if (auth.credentials.access_token && admin != '1' ) {
        this.showAuthSection = true;
      }
    });

  }

  addUser(): void {
    let result = confirm('¿Estás seguro que quieres inscribirte en esta actividad?');
    if (result) {
      const userId = localStorage.getItem('userId');
      if(userId){
        this.store.dispatch(ActivityAction.addUser({ userxactivity: { user_id: userId, activity_id: this.Id } }));
      }
    }
  }
  viewActivity(): void {
    this.router.navigateByUrl('/activity/view/' + this.Id);
  }
}

