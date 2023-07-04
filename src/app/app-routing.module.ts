import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaHomeComponent } from './AppNoLogged-components/ca-home/ca-home.component';
import { CaLoginComponent } from './AppNoLogged-components/ca-login/ca-login.component';
import { CaRegistrationComponent } from './AppNoLogged-components/ca-registration/ca-registration.component';
import { CaRegistrationPromoteComponent } from './AppPromote-components/ca-registration-promote/ca-registration-promote.component';
import { CaNavbarComponent } from './AppNoLogged-components/ca-navbar/ca-navbar.component';
import { CaNavbarLoggedComponent } from './Appuser-components/ca-navbar-logged/ca-navbar-logged.component';
import { CaHomeLoggedComponent } from './Appuser-components/ca-home-logged/ca-home-logged.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AuthGuard } from './AuthGuard';
import { CaHomeLoggedPromoteComponent } from './AppPromote-components/ca-home-logged-promote/ca-home-logged-promote.component';
import { CaGestisciAttivitaPromoteComponent } from './AppPromote-components/ca-gestisci-attivita-promote/ca-gestisci-attivita-promote.component';




const routes: Routes = [
  { path: 'registrazionePromote', component:CaRegistrationPromoteComponent },
  { path: '', component: CaHomeComponent },
  { path: 'registrazione', component:CaRegistrationComponent },
  { path: 'login', component: CaLoginComponent},
  { path: 'loggedHome', component: CaHomeLoggedComponent,canActivate: [AuthGuard] },
  { path: 'loggedHomePromote', component: CaHomeLoggedPromoteComponent,canActivate: [AuthGuard] },
  { path: 'xxx', component: CaNavbarLoggedComponent },
  { path: 'xxx', component: GoogleMapComponent},
  { path: 'gestisciAttavitaPromote', component: CaGestisciAttivitaPromoteComponent,canActivate: [AuthGuard] },
];
// , canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
