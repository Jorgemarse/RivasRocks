import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';

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
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { ActivityCardComponent } from '../Shared/Components/activitycard/activitycard.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MyActivitiesComponent } from './components/my-activities/my-activities.component';

@NgModule({
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, CdkColumnDef],
  declarations: [
    // FormatDatePipe,
    ActivitiesListComponent, 
    ActivityDetailComponent,
    ActivityFormComponent,
    ActivityCardComponent,
    UsersListComponent,
    MyActivitiesComponent
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
export class ActivityModule {}