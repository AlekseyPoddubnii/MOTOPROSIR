import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './auth/login/login.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { PublicModule } from './public/public.module';
import { AboutPageComponent } from './public/about-page/about-page.component';
import { EventsComponent } from './account/events/events.component';
import { BoardPageComponent } from './account/board-page/board-page.component';
import { HomePageComponent } from './public/home-page/home-page.component';
import { EventComponent } from './public/event/event.component';
import { SettingsComponent } from './account/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'index', component: HomePageComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'account/settings', component: SettingsComponent },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'board', component: BoardPageComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventComponent },
  { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
