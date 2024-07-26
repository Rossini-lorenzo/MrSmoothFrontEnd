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
    const expirationDate = decoded.exp * 1000; // exp è in secondi, quindi moltiplica per 1000
    return (Date.now() >= expirationDate);
  }

  logout(): void {
    localStorage.removeItem('token');
    // Altre operazioni di logout come pulire lo stato dell'utente
  }
}
