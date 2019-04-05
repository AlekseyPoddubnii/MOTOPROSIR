import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccountComponent } from './account/account.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutPageComponent } from './public/about-page/about-page.component';
import { EventsComponent } from './account/events/events.component';
import { BoardPageComponent } from './account/board-page/board-page.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { EventComponent } from './public/event/event.component';
import { SettingsComponent } from './account/settings/settings.component';
import { ProfileComponent } from './account/profile/profile.component';
import { EventDetailComponent } from './account/events/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'index', component: HomePageComponent },
  { path: 'account', loadChildren: './account/account.module#AccountModule', canActivate: [AuthGuard]},
  { path: 'events/event', component: EventComponent },
  { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
