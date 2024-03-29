import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.profileUser = new UserDTO('', '', '', new Date(), '', '', 0);

    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.profileUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.profileUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });

    this.store.select('auth').subscribe((auth) => {
      console.log('hay token');
      if (!auth.credentials.access_token) {
        console.log('no hay token');
        this.router.navigateByUrl('/login');
      }
    });

    this.store.select('user').subscribe((user) => {
      this.profileUser = user.user;
      console.log(this.profileUser);

      this.name.setValue(this.profileUser.name);
      this.surname_1.setValue(this.profileUser.surname_1);
      this.surname_2.setValue(this.profileUser.surname_2);
      this.birth_date.setValue(
        formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en')
      );
      this.email.setValue(this.profileUser.email);

      this.profileForm = this.formBuilder.group({
        name: this.name,
        surname_1: this.surname_1,
        surname_2: this.surname_2,
        birth_date: this.birth_date,
        email: this.email,
      });

    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.store.dispatch(UserAction.getUserById({ userId: userId }));
    }
  }

  updateUser(): void {
    const userId = localStorage.getItem('userId');
    this.isValidForm = false;
    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    if (userId) {
      this.store.dispatch(
        UserAction.updateUser({ userId: userId, user: this.profileUser })
      );
    }
    this.ngOnInit();
    alert('Usuario actualizado correctamente');
    location.reload();

  }
}
