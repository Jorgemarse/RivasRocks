import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Auth/actions';
import { AuthDTO } from 'src/app/Auth/models/auth.dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public active : boolean = false;
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  showAuthSectionAdmin: boolean;
  loading: boolean;

  constructor(private router: Router, private store: Store<AppState>) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.showAuthSectionAdmin= false;   
    this.loading = false;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    const admin = localStorage.getItem('admin');
    if (token) {
      const credentials: AuthDTO = {
        user: '',
        access_token: token,
        email: '',
        password: '',
      };
      this.store.dispatch(AuthAction.loginSuccess({ credentials}));
    }
    this.store.select('auth').subscribe((auth) => {
      
      this.loading = true;
      this.showAuthSectionAdmin = false;
      this.showAuthSection = false;
      this.showNoAuthSection = true
      //console.log(auth);
      if (auth.credentials.access_token) {
        if(admin == '1' || auth.credentials.user['Admin'] == 1){
          this.showAuthSectionAdmin = true;
          this.showNoAuthSection = false;
        }else{
          this.showAuthSection = true;
          this.showNoAuthSection = false;
        }
      
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
      });
      this.loading = false;
    });

  }
  setNavActive(){
    this.active = !this.active;
  }

  home(): void {
    this.router.navigateByUrl('home');
    this.active = false;
  }

  about(): void {
    this.router.navigateByUrl('about');
    this.active = false;
  }

  contact(): void {
    this.router.navigateByUrl('contact');
    this.active = false;
  }

  login(): void {
    this.router.navigateByUrl('login');
    this.active = false;
  }

  register(): void {
    this.router.navigateByUrl('register');
    this.active = false;
  }

  adminPosts(): void {
    this.router.navigateByUrl('posts');
  }

  adminActivities(): void {
    this.router.navigateByUrl('activities');
  }

  myactivities(): void {
    this.router.navigateByUrl('myactivities');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    localStorage.removeItem('access_token');
    localStorage.removeItem('admin');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['home']);
      });
    this.active = false;
  }
}
