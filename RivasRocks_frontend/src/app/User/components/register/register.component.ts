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
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;
  confirmpassword: FormControl;

  registerForm: FormGroup;
  isValidForm: boolean | null;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public UserService: UserService,
    public router: Router
  ) {
    this.registerUser = new UserDTO('', '', '', new Date(), '', '', 0);

    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.registerUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.registerUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmpassword = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = false;
  }

  register() {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;
    const user: UserDTO = {
      access_token: '',
      name: this.registerUser.name,
      surname_1: this.registerUser.surname_1,
      surname_2: this.registerUser.surname_2,
      birth_date: new Date(formatDate(this.registerUser.birth_date,'yyyy-MM-dd', 'en')),
      email: this.registerUser.email,
      password: this.registerUser.password,
      admin: 0,
    };

    //console.log(this.registerUser);
    this.store.dispatch(UserAction.register({ user }));
    
    // this.UserService.register(user).subscribe((data) => {
    //   console.log(data);
    //   return this.registerUser = data;
    //   //this.UserService.setToken(data.access_token);
      
    // }, (error) => {
    //   console.log(error);
    // });
    this.loading = true;
    this.router.navigateByUrl("/home");
    
  }
}
