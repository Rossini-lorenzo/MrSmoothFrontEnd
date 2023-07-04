import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaRegistrationComponent } from './AppNoLogged-components/ca-registration/ca-registration.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';
import { CaNavbarLoggedComponent } from './Appuser-components/ca-navbar-logged/ca-navbar-logged.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map/google-map.component'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CaHomeLoggedComponent } from './Appuser-components/ca-home-logged/ca-home-logged.component';
import { CaRegistrationPromoteComponent } from './AppPromote-components/ca-registration-promote/ca-registration-promote.component';
import { CaNavbarLoggedPromoteComponent } from './AppPromote-components/ca-navbar-logged-promote/ca-navbar-logged-promote.component';
import { CaHomeLoggedPromoteComponent } from './AppPromote-components/ca-home-logged-promote/ca-home-logged-promote.component';
import { CaGestisciAttivitaPromoteComponent } from './AppPromote-components/ca-gestisci-attivita-promote/ca-gestisci-attivita-promote.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    CaRegistrationComponent,
    CaLoginComponent,
    CaHomeComponent,
    CaNavbarComponent,
    CaNavbarLoggedComponent,
    GoogleMapComponent,
    CaHomeLoggedComponent,
    CaRegistrationPromoteComponent,
    CaNavbarLoggedPromoteComponent,
    CaHomeLoggedPromoteComponent,
    CaGestisciAttivitaPromoteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule 
  ],
  providers: [GoogleMapComponent],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
