import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './AuthGuard';

import { AppComponent } from './app.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';


import { CaScanComponent } from './AppNoLogged-components/ca-scan/ca-scan.component';
import { CaOverwiewComponent } from './AppNoLogged-components/ca-overwiew/ca-overwiew.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CaChestComponent } from './AppNoLogged-components/ca-chest/ca-chest.component';

import { CaCalendarComponent } from './AppNoLogged-components/ca-calendar/ca-calendar.component';
import { ScStaffManagementComponent } from './AppNoLogged-components/sc-staff-management/sc-staff-management.component';
import { ScCustomersManagementComponent } from './AppNoLogged-components/sc-customers-management/sc-customers-management.component';
import { ScProductsManagementComponent } from './AppNoLogged-components/sc-products-management/sc-products-management.component';
import { ScServicesManagementComponent } from './AppNoLogged-components/sc-services-management/sc-services-management.component';
import { ScSummaryWarehouseComponent } from './AppNoLogged-components/sc-summary-warehouse/sc-summary-warehouse.component';
import { ScProductInvoicesComponent } from './AppNoLogged-components/sc-product-invoices/sc-product-invoices.component';
import { ScManageAutomaticMessageComponent } from './AppNoLogged-components/sc-manage-automatic-message/sc-manage-automatic-message.component';
import { ScShopPerformanceComponent } from './AppNoLogged-components/sc-shop-performance/sc-shop-performance.component';
import { ScStaffPerformanceComponent } from './AppNoLogged-components/sc-staff-performance/sc-staff-performance.component';
import { ScShopInvoicesComponent } from './AppNoLogged-components/sc-shop-invoices/sc-shop-invoices.component';
import { ScSalesArchiveComponent } from './AppNoLogged-components/sc-sales-archive/sc-sales-archive.component';
import { ScModalComponent } from './sc-ui/sc-modal/sc-modal.component';
import { ScAlertComponent } from './sc-ui/sc-alert/sc-alert.component';

// Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular';

import { LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { CaRegisterComponent } from './AppNoLogged-components/ca-register/ca-register.component';
import { EventDialogContentComponent } from './event-dialog-content/event-dialog-content.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; // Assicurati di aver aggiunto questa riga
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FooterComponent } from './AppNoLogged-components/footer/footer.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { authInterceptor } from './auth.interceptor';
import {googleCalendarInterceptor} from './google-calendar-interceptor.interceptor'
//Interceptor per jwt


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
    ScStaffManagementComponent,
    ScCustomersManagementComponent,
    ScProductsManagementComponent,
    ScServicesManagementComponent,
    ScSummaryWarehouseComponent,
    ScProductInvoicesComponent,
    ScManageAutomaticMessageComponent,
    ScShopPerformanceComponent,
    ScStaffPerformanceComponent,
    ScShopInvoicesComponent,
    ScSalesArchiveComponent,
    ScModalComponent,
    ScAlertComponent,
    EventDialogContentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatSliderModule,
    NgxScannerQrcodeModule,
    FullCalendarModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    CanvasJSAngularChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    { provide: LOCALE_ID, useValue: 'it-IT' },
    MatDialog,
    provideHttpClient(withInterceptors([authInterceptor,googleCalendarInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  onstructor() {
    registerLocaleData(localeIt, 'it');
  }
}
