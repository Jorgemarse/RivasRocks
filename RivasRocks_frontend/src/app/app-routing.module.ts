import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login.component';
import { HomeComponent } from './Shared/Components/home/home.component';
import { PostFormComponent } from './Post/components/post-form/post-form.component';
import { PostsListComponent } from './Post/components/posts-list/posts-list.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { ProfileComponent } from './User/components/profile/profile.component';
import { RegisterComponent } from './User/components/register/register.component';
import { AboutComponent } from './Shared/Components/about/about.component';
import { ContactComponent } from './Shared/Components/contact/contact.component';
import { PostDetailComponent } from './Post/components/post-detail/post-detail.component';
import { ActivitiesListComponent } from './Activity/components/activities-list/activities-list.component';
import { ActivityFormComponent } from './Activity/components/activity-form/activity-form.component';
import { ActivityDetailComponent } from './Activity/components/activity-detail/activity-detail.component';
import { MyActivitiesComponent } from './Activity/components/my-activities/my-activities.component';
import { UsersListComponent } from './Activity/components/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/post/:id',
    component: PostFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/post',
    component: PostFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/view/:id',
    component: PostDetailComponent,
  },
  {
    path: 'activities',
    component: ActivitiesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/activity/:id',
    component: ActivityFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/activity',
    component: ActivityFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activity/view/:id',
    component: ActivityDetailComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myactivities',
    component: MyActivitiesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activity/userslist/:id',
    component: UsersListComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
