import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Speaker {
  id: string;
  name: string;
  surname: string; 
}

export interface Talk {
  id: string;
  title: string;
  description: string;
  speakers?: Speaker[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  start: string;
  end: string;
  maxParticipants: number;
  participantsCount: number;
  remaining?: number;
  bookingMessage?: string;
  tags?: Tag[];
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:8080/events';
  private talksUrl = 'http://localhost:8080/talks'; // Nuovo endpoint per i talk
  private bookingUrl = 'http://localhost:8080/bookings'; 

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      map(events =>
        events.map(event => {
          const maxParticipants = event.maxParticipants;
          const participantsCount = event.participantsCount;
          return {
            ...event,
            date: new Date(event.date),
            remaining: maxParticipants - participantsCount
          };
        })
      ),
      switchMap(events => {
        const eventsWithTags$ = events.map(event =>
          this.getTagsByEventId(event.id).pipe(
            map(tags => ({
              ...event,
              tags
            }))
          )
        );
        return forkJoin(eventsWithTags$);
      })
    );
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      map(event => ({
        ...event,
        date: new Date(event.date),
        remaining: event.maxParticipants - event.participantsCount,
      }))
    );
  }

  getTalksByEventId(eventId: number): Observable<Talk[]> {
    return this.http.get<Talk[]>(`${this.apiUrl}/${eventId}/talks`).pipe(catchError(() => []));
  }

  getSpeakersByTalkId(talkId: string): Observable<Speaker[]> {
    return this.http.get<Speaker[]>(`${this.talksUrl}/${talkId}/speakers`).pipe(catchError(() => []));
  }

  createBooking(eventId: string): Observable<any> {
    const url = `${this.bookingUrl}/${eventId}`;

    return this.http.post<any>(url, null, { withCredentials: true }).pipe(
      map(response => {
        return { success: true, message: 'Booking created successfully', data: response };
      }),
      catchError(error => {
        console.error('Error response:', error);
        let errorMessage = 'Failed to create booking';
        if (error.status === 409) {  // Gestione stato 409 CONFLICT
          errorMessage = 'Hai già una prenotazione attiva per questo evento';
        } else if (error.status === 404) {
          errorMessage = 'Utente non trovato';
        } else if (error.status === 204) {
          errorMessage = 'Nessun contenuto disponibile per questo evento';
        }
        return of({ success: false, message: errorMessage, error });
      })
    );
  }

  getTagsByEventId(eventId: string): Observable<Tag[]> {
    const url = `${this.apiUrl}/${eventId}/tags`;
    return this.http.get<Tag[]>(url);
  }
}
