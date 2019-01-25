import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'account', component: AccountComponent, children: [
      {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
      {path: 'board', component: BoardPageComponent, canActivate: [AuthGuard]}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
