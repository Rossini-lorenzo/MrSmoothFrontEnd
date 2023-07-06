import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';
//import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    CaLoginComponent,
    CaHomeComponent,
    CaNavbarComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //GoogleMapsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
