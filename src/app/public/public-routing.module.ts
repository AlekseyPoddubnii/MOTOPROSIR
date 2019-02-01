import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PublicComponent } from './public.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      // { path: 'index', component: HomePageComponent },
      // { path: 'event', component: EventComponent },
      // { path: 'about', component: AboutPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
