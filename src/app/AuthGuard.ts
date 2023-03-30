
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AroundClientService } from './service/around-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AroundClientService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
