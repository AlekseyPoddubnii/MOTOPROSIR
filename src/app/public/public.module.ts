import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page/home-page.component';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    PublicComponent,
    AboutPageComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AuthRoutingModule
  ]
})

export class PublicModule {}
