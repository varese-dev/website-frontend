import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface ModifyRequest {
  name?: string;
  surname?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

interface CreateTalkRequest {
  talk: Talk;
  tagNames: string[];
}

interface Talk {
  id?: string;
  title: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

interface Booking {
  bookingId: string;
  title: string;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class AreaUtenteService {
  private apiUrl = 'https://localhost:8443/user';
  private  bookingUrl = 'https://localhost:8443/bookings';
  private talkUrl = 'https://localhost:8443/talks';

  constructor(private http: HttpClient) {}

  fetchUserId(): Observable<string> {
    return this.http.get<{ userId: string }>(`${this.apiUrl}/session`, { withCredentials: true }).pipe(
      map(response => response.userId)
    );
  }

  fetchUserData(): Observable<User> {
    return this.fetchUserId().pipe(
      switchMap(userId => this.http.get<User>(`${this.apiUrl}/${userId}`, { withCredentials: true })),
      catchError(this.handleError)
    );
  }

  fetchUserActiveBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingUrl}/user/details`, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  cancelBooking(bookingId: string): Observable<string> {
    return this.http.put(`${this.bookingUrl}/${bookingId}/cancel`, null, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  createTalk(request: CreateTalkRequest): Observable<Talk> {
    return this.http.post<Talk>(this.talkUrl, request, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  modifyName(name: string): Observable<string> {
    return this.http.put(`${this.apiUrl}/modify/name`, { name }, {
      withCredentials: true,
      responseType: 'text'  // Accetta risposta come testo
    }).pipe(
      catchError(this.handleError)
    );
  }

  modifySurname(surname: string): Observable<string> {
    return this.http.put(`${this.apiUrl}/modify/surname`, { surname }, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  modifyPassword(oldPassword: string, newPassword: string, repeatNewPassword: string): Observable<string> {
    return this.http.put(`${this.apiUrl}/modify/password`,
      { oldPassword, newPassword, repeatNewPassword }, {
        withCredentials: true,
        responseType: 'text'
      }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error fetching user data:', error);
    return throwError('Errore durante il recupero dei dati utente. Riprova più tardi.');
  }
}
