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
import { CaScanComponent } from './AppNoLogged-components/ca-scan/ca-scan.component';
import { RouterModule } from '@angular/router';
import { CaOverwiewComponent } from './AppNoLogged-components/ca-overwiew/ca-overwiew.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CaChestComponent } from './AppNoLogged-components/ca-chest/ca-chest.component';
import { AuthGuard } from './AuthGuard';
import { CaCalendarComponent } from './AppNoLogged-components/ca-calendar/ca-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; // Puoi scegliere l'adattatore desiderato
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // this plugin isn´t installed



import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CaRegisterComponent } from './AppNoLogged-components/ca-register/ca-register.component';
import { EventDialogContentComponent } from './event-dialog-content/event-dialog-content.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; // Assicurati di aver aggiunto questa riga
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FooterComponent } from './AppNoLogged-components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CaLoginComponent,
    CaHomeComponent,
    CaNavbarComponent,
    CaScanComponent,
    CaOverwiewComponent,
    CaChestComponent,
    CaCalendarComponent,
    CaRegisterComponent,
    EventDialogContentComponent,
    FooterComponent
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    //GoogleMapsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule,
    NgxScannerQrcodeModule ,
    FullCalendarModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    CanvasJSAngularChartsModule
  ],
  providers: [AuthGuard ,{ provide: LOCALE_ID, useValue: 'it-IT' },    MatDialog // Assicurati di includere questo provider
],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  
  onstructor() {
    registerLocaleData(localeIt, 'it');

  }

 }
