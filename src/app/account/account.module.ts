import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { AccountComponent } from './account.component';
import { HeaderAccountComponent } from './shared/components/header-account/header-account.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ],
  declarations: [
    EventsComponent,
    BoardPageComponent,
    AccountComponent,
    HeaderAccountComponent,
    AddEventComponent
  ]
})

export class AccountModule { }
