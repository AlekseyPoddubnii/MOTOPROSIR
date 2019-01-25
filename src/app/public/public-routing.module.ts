import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PublicComponent } from './public.component';
import { PublicGuard } from '../shared/guards/public.guard';

const routes: Routes = [
  {
    path: '', component: PublicComponent, canActivate: [PublicGuard], children: [
      { path: 'index', component: HomePageComponent },
      { path: 'about', component: AboutPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
