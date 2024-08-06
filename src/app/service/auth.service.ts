import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const expirationDate = decoded.exp * 1000; // `exp` è in secondi, quindi moltiplica per 1000
    return (Date.now() >= expirationDate);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('piva');
    localStorage.removeItem('id');
    localStorage.removeItem('companyName');
    localStorage.removeItem('google_access_token'); // Rimuovi anche il token di Google
    localStorage.removeItem('google_refresh_token');
  }

  // Metodi per gestire il token di Google
  getGoogleToken(): string | null {
    return localStorage.getItem('googleAuthCode');
  }



  isGoogleTokenExpired(): boolean {
    const token = this.getGoogleToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const expirationDate = decoded.exp * 1000; // `exp` è in secondi, quindi moltiplica per 1000
    return (Date.now() >= expirationDate);
  }


}
