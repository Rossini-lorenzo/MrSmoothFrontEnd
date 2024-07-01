import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaCalendarComponent } from './AppNoLogged-components/ca-calendar/ca-calendar.component';


import { AuthGuard } from './AuthGuard';
import { CaScanComponent } from './AppNoLogged-components/ca-scan/ca-scan.component';
import { CaOverwiewComponent } from './AppNoLogged-components/ca-overwiew/ca-overwiew.component';
import { CaChestComponent } from './AppNoLogged-components/ca-chest/ca-chest.component';
import { CaRegisterComponent } from './AppNoLogged-components/ca-register/ca-register.component';





const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: CaLoginComponent },
  {
    path: 'smart-control',
    component: CaHomeComponent,
    canActivate: [AuthGuard], // Applicato qui per proteggere tutte le child routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CaOverwiewComponent, data: { breadcrumb: 'Home / Dashboard' } },
      { path: 'product-scanner', component: CaScanComponent, data: { breadcrumb: 'Magazzino / Scanner Prodotti' } },
      { path: 'appointment-calendar', component: CaCalendarComponent, data: { breadcrumb: 'Appuntamenti / Agenda' } },
      { path: 'cash-register', component: CaChestComponent },
      { path: 'register', component: CaRegisterComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
