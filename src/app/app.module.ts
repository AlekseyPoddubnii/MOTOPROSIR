import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { PublicModule } from './public/public.module';
<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { fakeBackendProvider } from './auth/helpers/fake-backend';
import { JwtInterceptor} from './auth/helpers/jwt.interceptor';
import {  ErrorInterceptor  } from './auth/helpers/error.interceptor';
import { HomeComponent } from './auth/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
>>>>>>> master
=======
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    PublicModule,
<<<<<<< HEAD
    MatDialogModule,
<<<<<<< HEAD
    HttpClientModule
  ],
  providers: [HttpClientModule],
=======
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: MatDialogRef, useValue: {} },
    // { provide: MAT_DIALOG_DATA, useValue: [] },

    // fake backend
    fakeBackendProvider
  ],
>>>>>>> master
=======
    HttpClientModule,
  ],
  providers: [],
>>>>>>> master
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
