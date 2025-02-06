import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface EventRequest {
  event: Event;
  talks: Talk[];
  tags: Tag[];
}

interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  address: string;
  maxParticipants: number;
  partnerId?: string;
  sponsorId?: string;
}

interface Tag {
  id?: string;
  name: string;
}

interface Partner {
  id: string;
  name: string;
  description: string;
  place: string;
  website: string;
  email: string;
  image?: string;
  value: string;
}

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

interface Bookings {
  id: string;
  eventId: string;
  userId: string;
  date: string;
  status: string;
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
export class AdminService {
  private apiUrl = 'http://localhost:8080/user';
  private  bookingUrl = 'http://localhost:8080/bookings';
  private eventUrl = 'http://localhost:8080/events';
  private talkUrl = 'http://localhost:8080/talks';
  private tagUrl = 'http://localhost:8080/tags';
  private partnerUrl = 'http://localhost:8080/partners';

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

  getAllBookings(): Observable<Bookings[]> {
    return this.http.get<Bookings[]>(this.bookingUrl).pipe(
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

  getAllTalks(): Observable<Talk[]> {
    return this.http.get<Talk[]>(this.talkUrl).pipe(
        catchError(this.handleError)
    );
  }

  updateTalk(id: string, talk: Talk): Observable<void> {
    return this.http.put<void>(`${this.talkUrl}/${id}`, talk, {
      withCredentials: true,
    }).pipe(
        catchError(this.handleError)
    );
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.tagUrl, tag, { withCredentials: true }).pipe(
        catchError(this.handleError)
    );
  }

  createTalk(request: CreateTalkRequest): Observable<Talk> {
    return this.http.post<Talk>(this.talkUrl, request, { withCredentials: true }).pipe(
      catchError(this.handleError)
    );
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagUrl).pipe(
        catchError(this.handleError)
    );
  }

  updateTag(id: string, tag: Tag): Observable<void> {
    return this.http.put<void>(`${this.tagUrl}/${id}`, tag, {
      withCredentials: true,
    }).pipe(
        catchError(this.handleError)
    );
  }

  createEvent(request: EventRequest): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, request, { withCredentials: true }).pipe(
        catchError(this.handleError)
    );
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl).pipe(
        catchError(this.handleError)
    );
  }

  updateEvent(id: string, event: Event): Observable<void> {
    return this.http.put<void>(`${this.eventUrl}/${id}`, event, {
      withCredentials: true,
    }).pipe(
        catchError(this.handleError)
    );
  }

  getAllPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.partnerUrl).pipe(
        catchError(this.handleError)
    );
  }

  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(this.partnerUrl, partner, { withCredentials: true }).pipe(
        catchError(this.handleError)
    );
  }

  updatePartner(id: string, partner: Partner): Observable<void> {
    return this.http.put<void>(`${this.partnerUrl}/${id}`, partner, {
      withCredentials: true,
    }).pipe(
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
