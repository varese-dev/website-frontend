import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/auth'; // Endpoint base
  private userUrl = 'http://localhost:8080/user'; // Endpoint base

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.authUrl}/login`, loginData, {
      headers,
      responseType: 'text',
      withCredentials: true
    });
  }

  forgottenPassword(emailOrPhone: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.userUrl}/forgottenPassword`, { emailOrPhone }, {
      headers,
      responseType: 'text'
    });
  }

  register(registerData: registrationData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.authUrl}/register`, registerData, {
      headers,
      responseType: 'text'
    });
  }
}

export interface LoginData {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean;
}

export interface registrationData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}
