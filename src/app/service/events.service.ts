import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  start: string;
  end: string;
  maxParticipants: number;
  participantsCount: number;
  remaining?: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:8080/events';
  private talksUrl = 'http://localhost:8080/talks'; // Nuovo endpoint per i talk

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      map((events) =>
        events.map((event) => ({
          ...event,
          date: new Date(event.date),
          remaining: event.maxParticipants - event.participantsCount,
        }))
      )
    );
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      map((event) => ({
        ...event,
        date: new Date(event.date),
        remaining: event.maxParticipants - event.participantsCount,
      }))
    );
  }

  getTalksByEventId(eventId: number): Observable<Talk[]> {
    return this.http
      .get<Talk[]>(`${this.apiUrl}/${eventId}/talks`)
      .pipe(catchError(() => []));
  }

  getSpeakersByTalkId(talkId: string): Observable<Speaker[]> {
    return this.http
      .get<Speaker[]>(`${this.talksUrl}/${talkId}/speakers`)
      .pipe(catchError(() => []));
  }
}
