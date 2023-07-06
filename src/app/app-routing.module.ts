import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';

import { AuthGuard } from './AuthGuard';





const routes: Routes = [
  { path: '', component: CaLoginComponent },
  { path: 'login', component: CaLoginComponent},
  { path: 'home', component: CaHomeComponent},
];
// , canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
