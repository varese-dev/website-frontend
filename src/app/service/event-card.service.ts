import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string;
  description: string;
  date: Date;  // Ora è un oggetto Date
  timeRemaining?: string; // Aggiunto per evitare undefined
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl).pipe(
      map(events =>
        events.map(event => ({
          ...event,
          date: new Date(event.date), // Converte la stringa in Date
          timeRemaining: '' // Inizializza per evitare undefined
        }))
      )
    );
  }

  getEventById(id: string): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      map(event => ({
        ...event,
        date: new Date(event.date), // Converte la stringa in Date
        timeRemaining: '' // Inizializza per sicurezza
      }))
    );
  }
}
