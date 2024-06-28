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
    path: 'home',
    component: CaHomeComponent,
    canActivate: [AuthGuard], // Applicato qui per proteggere tutte le child routes
    children: [
      { path: '', redirectTo: 'smart-control/dashboard', pathMatch: 'full' },
      { path: 'smart-control/dashboard', component: CaOverwiewComponent },
      { path: 'smart-control/product-scanner', component: CaScanComponent },
      { path: 'smart-control/appointment-calendar', component: CaCalendarComponent },
      { path: 'smart-control/cash-register', component: CaChestComponent },
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
