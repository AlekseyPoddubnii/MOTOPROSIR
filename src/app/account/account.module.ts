import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { AccountComponent } from './account.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccHeaderComponent } from './shared/components/acc-header/acc-header.component';
import { EventsService } from './shared/services/events.service';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsShowComponent } from './blogs/blogs-show/blogs-show.component';
import { SettingsComponent } from './settings/settings.component';

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
  ],
  providers: [EventsService]
})

export class AccountModule { }
