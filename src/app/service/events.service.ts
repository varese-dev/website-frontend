import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;       
  start: string;
  end: string;
  maxParticipants: number;
  participantsCount: number;
  category: string;
  remaining?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:8080/events';

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
      )
    );
  }

  getEventById(id: number): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      map(event => {
        const maxParticipants = event.maxParticipants;
        const participantsCount = event.participantsCount;
        return {
          ...event,
          date: new Date(event.date),
          remaining: maxParticipants - participantsCount
        };
      })
    );
  }
}
