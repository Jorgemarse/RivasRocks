import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';
import { HomeComponent } from '../Shared/Components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostCardComponent } from '../Shared/Components/postcard/postcard.component';
import { ActivityGridComponent } from '../Shared/Components/activitygrid/activitygrid.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';


@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, CdkColumnDef],
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    FormatDatePipe,
    PostCardComponent,
    ActivityGridComponent,
    PostDetailComponent,
    
  ],
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule, 
    MatProgressSpinnerModule],
})
export class PostModule {}
