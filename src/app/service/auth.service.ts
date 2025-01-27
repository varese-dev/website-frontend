// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:8080/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, phoneNumber: string): Observable<any> {
    const body = { email, password, phoneNumber };
    return this.http.post(this.apiUrl, body);
  }
}
