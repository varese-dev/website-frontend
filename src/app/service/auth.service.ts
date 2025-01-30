import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  /**
   * Effettua il login con email, telefono e password.
   * @param credentials
   * @returns Observable con la risposta del server
   */
  login(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // Recupera il token salvato
    });

    return this.http.post(this.loginUrl, loginData, { headers });
  }

  /**

   * @param userData
   * @returns Observable con la risposta del server
   */
  register(userData: RegisterData): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }
}


export interface RegisterData {
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface LoginData {
  email?: string;
  phone?: string;
  password: string;
}
