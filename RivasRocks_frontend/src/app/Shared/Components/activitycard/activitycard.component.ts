import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ActivityAction from '../../../Activity/actions';

@Component({
  selector: 'app-activitycard',
  templateUrl: './activitycard.component.html',
  styleUrls: ['./activitycard.component.scss'],
})
export class ActivityCardComponent {
  @Input() title: string | undefined;
  @Input() publication_date: Date | undefined;
  @Input() Id: string;
  @Input() location: string | undefined;
  @Input() activity_date: Date | undefined;
  @Input() showButtons: boolean | undefined;
  @Input() desincriptionbtn: boolean | undefined;

  constructor(private router: Router, private store: Store<AppState>) {
    this.Id = '';
  }
  updateActivity(): void {
    this.router.navigateByUrl('/user/activity/' + this.Id);
  }

  deleteActivity(): void {
    let result = confirm('¿Estás seguro que quieres eliminar esta actividad?');
    if (result) {
      this.store.dispatch(ActivityAction.deleteActivity({ activityId: this.Id }));
    }
  }
  desincription(): void {
    const userId = localStorage.getItem('userId');
    confirm('¿Estás seguro que quieres desincribirte de esta actividad?');
    if (userId) {
      this.store.dispatch(ActivityAction.removeUser({ userxactivity: { activity_id: this.Id, user_id: userId} }));
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['myactivities'])});
  }

  viewActivity(): void {
    this.router.navigateByUrl('/activity/view/' + this.Id);
  }

  usersList(): void {
    this.router.navigateByUrl('/activity/userslist/' + this.Id);
  }
}
