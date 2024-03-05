import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';
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
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: CaOverwiewComponent },
      { path: 'scanaggiungi', component: CaScanComponent },
      { path: 'calendario', component: CaCalendarComponent },
      { path: 'chest', component: CaChestComponent },
      { path: 'register', component: CaRegisterComponent }
    ], canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
