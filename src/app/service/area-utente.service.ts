import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AreaUtenteService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  /*getUserById(userId: string): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Errore nel recupero dell\'utente:', error);
        return throwError(() => new Error('Errore nel recupero dell\'utente'));
      })
    );
  }*/
}
