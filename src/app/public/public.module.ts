import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { HomePageComponent } from './home-page/home-page.component';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { AboutPageComponent } from './about-page/about-page.component';
import { ModalComponent } from '../shared/directives/modal.component';
import { ModalService } from '../shared/services/modal.service';
import { RegisterComponent } from '../auth/register/register.component';
import { AlertComponent } from '../shared/alerts/alert.component';
import { EventComponent } from './event/event.component';



@NgModule({
  declarations: [
    HomePageComponent,
    PublicComponent,
    AboutPageComponent,
    ModalComponent,
    RegisterComponent,
    AlertComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ModalService,
],
})

export class PublicModule {}
