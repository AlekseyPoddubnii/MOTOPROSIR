import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AccountRoutingModule } from './account-routing.module';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { AccountComponent } from './account.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccHeaderComponent } from './shared/components/acc-header/acc-header.component';
import { EventsService } from './shared/services/events.service';
import { BlogsComponent } from './profile/blogs/blogs.component';
import { BlogsShowComponent } from './profile/blogs/blogs-show/blogs-show.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { EventComponent } from '../public/event/event.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
// import { JwtInterceptor } from '../auth/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    EventsComponent,
    BoardPageComponent,
    AccountComponent,
    AddEventComponent,
    AccHeaderComponent,
    BlogsComponent,
    BlogsShowComponent,
    SettingsComponent,
    ProfileComponent,
    EventDetailComponent
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    EventsService
  ]
})

export class AccountModule { }
