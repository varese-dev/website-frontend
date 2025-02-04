import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:8080/user';
  private  bookingUrl = 'http://localhost:8080/bookings';


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

  cancelBooking(bookingId: string): Observable<void> {
    return this.http.put<void>(`${this.bookingUrl}/${bookingId}/cancel`, null, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error fetching user data:', error);
    return throwError('Errore durante il recupero dei dati utente. Riprova più tardi.');
  }
}
