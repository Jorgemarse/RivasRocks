import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ActivityAction from '../../actions';
import * as UserAction from '../../../User/actions/user.action';
import { UserDTO } from '../../../User/models/user.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users: UserDTO[];
  displayedColumns: string[] = [
    'name',
    'surname_1',
    'surname_2',
    'email',
  ];

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.users = new Array<UserDTO>();

    this.loadUsers();
  }

  private loadUsers(): void {
    const activityId = this.route.snapshot.paramMap.get('id');
    if (activityId) {
      this.store.dispatch(
        UserAction.getUsersByActivityId({ activityId: activityId })
      );
    }
    this.store.select('user').subscribe(users => {
      this.users = users.users;
      console.log(this.users);
    });
  }
}
