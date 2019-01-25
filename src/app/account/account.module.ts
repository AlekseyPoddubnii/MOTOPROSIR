import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { AccountComponent } from './account.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { FormsModule } from '@angular/forms';
import { AccHeaderComponent } from './shared/components/acc-header/acc-header.component';
import { EventsService } from './shared/services/events.service';

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
    AddEventComponent,
    AccHeaderComponent
  ],
  providers: [EventsService]
})

export class AccountModule { }
