import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'https://localhost:8080/auth/login';
  private registerUrl = 'https://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  /**
   * Effettua il login.
   * @param email
   * @param password
   * @param phoneNumber
   * @returns
   */
  login(email: string, password: string, phoneNumber: string): Observable<any> {
    const body = { email, password, phoneNumber };
    return this.http.post(this.loginUrl, body);
  }

  /**
   * Effettua la registrazione di un nuovo utente.
   * @param userData
   * @returns
   */
  register(userData: { email?: string; phoneNumber?: string; password: string; name: string; surname: string }): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }
}
