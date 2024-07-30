// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//AuthGuard
import { AuthGuard } from './AuthGuard';

//Components
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaCalendarComponent } from './AppNoLogged-components/ca-calendar/ca-calendar.component';
import { CaScanComponent } from './AppNoLogged-components/ca-scan/ca-scan.component';
import { CaOverwiewComponent } from './AppNoLogged-components/ca-overwiew/ca-overwiew.component';
import { CaChestComponent } from './AppNoLogged-components/ca-chest/ca-chest.component';
import { CaRegisterComponent } from './AppNoLogged-components/ca-register/ca-register.component';
import { ScSalesArchiveComponent } from './AppNoLogged-components/sc-sales-archive/sc-sales-archive.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CaLoginComponent },
  {
    path: 'smart-control',
    component: CaHomeComponent,
    canActivate: [AuthGuard], // Applicato qui per proteggere tutte le child routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: CaOverwiewComponent,
        data: { breadcrumb: 'Home / Dashboard' },
      },
      {
        path: 'staff-management',
        component: ScStaffManagementComponent,
        data: { breadcrumb: 'Negozio / Dipendenti' },
      },
      {
        path: 'customers-management',
        component: ScCustomersManagementComponent,
        data: { breadcrumb: 'Negozio / Clienti' },
      },
      {
        path: 'products-management',
        component: ScProductsManagementComponent,
        data: { breadcrumb: 'Negozio / Prodotti' },
      },
      {
        path: 'services-management',
        component: ScServicesManagementComponent,
        data: { breadcrumb: 'Negozio / Servizi' },
      },
      {
        path: 'product-scanner',
        component: CaScanComponent,
        data: { breadcrumb: 'Magazzino / Scanner Prodotti' },
      },
      {
        path: 'summary-warehouse',
        component: ScSummaryWarehouseComponent,
        data: { breadcrumb: 'Magazzino / Sommario magazzino' },
      },
      {
        path: 'product-invoices',
        component: ScProductInvoicesComponent,
        data: { breadcrumb: 'Magazzino / Fatture prodotti' },
      },
      {
        path: 'appointment-calendar',
        component: CaCalendarComponent,
        data: { breadcrumb: 'Appuntamenti / Agenda' },
      },
      {
        path: 'manage-automatic-message',
        component: ScManageAutomaticMessageComponent,
        data: { breadcrumb: 'Appuntamenti / Gestisci messaggi automatici' },
      },
      {
        path: 'cash-register',
        component: CaChestComponent,
        data: { breadcrumb: 'Vendite / Cassa' },
      },
      {
        path: 'sales-register',
        component: CaRegisterComponent,
        data: { breadcrumb: 'Vendite / Registro giornaliero' },
      },
      {
        path: 'sales-archive',
        component: ScSalesArchiveComponent,
        data: { breadcrumb: 'Vendite / Registro giornaliero' },
      },
      {
        path: 'shop-performance',
        component: ScShopPerformanceComponent,
        data: { breadcrumb: 'Statistiche / Andamento negozio' },
      },
      {
        path: 'staff-performance',
        component: ScStaffPerformanceComponent,
        data: { breadcrumb: 'Statistiche / Andamento personale (dipendenti)' },
      },
      {
        path: 'shop-invoices',
        component: ScShopInvoicesComponent,
        data: { breadcrumb: 'Statistiche / Fatture negozio' },
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
