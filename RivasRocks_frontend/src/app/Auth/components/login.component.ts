import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private Router: Router,

  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
    
    // this.authService.authChanged.subscribe(() => {
    //   this.Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     this.Router.navigate(['home']);
    //   });
    // });
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = false;
  }

  login() {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user: '',
      access_token: '',
    };
    this.store.dispatch(AuthAction.login({ credentials }));
    
    console.log('Login success');

    this.Router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
         this.Router.navigate(['home']);
       });
  }
}
