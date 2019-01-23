import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
  },
  {
        path: 'login',
        component: LoginComponent,
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
