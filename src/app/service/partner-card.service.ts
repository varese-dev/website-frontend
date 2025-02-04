import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string;
  description: string;
  date: Date;
  timeRemaining?: string;
  maxParticipants: number;
  participantsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PartnerCardService {
  private apiUrl = 'http://localhost:8080/partners'; // Base URL aggiornata

  constructor(private http: HttpClient) {}

  getEventsByPartner(partnerId: string): Observable<Event[]> {
    const url = `${this.apiUrl}/${partnerId}/events`; // URL aggiornata con l'ID del partner
    return this.http.get<Event[]>(url).pipe(
      map(events =>
        events.map(event => {
          const maxParticipants = event.maxParticipants;
          const participantsCount = event.participantsCount;

          console.log(`Event Title: ${event.title}`);
          console.log(`Max Participants: ${maxParticipants}`);
          console.log(`Participants Count: ${participantsCount}`);
          console.log(`Remaining Slots: ${maxParticipants - participantsCount}`);

          return {
            ...event,
            date: new Date(event.date), // Converte la stringa in Date
            timeRemaining: '',           // Inizializza per evitare undefined
            maxParticipants: maxParticipants, // Assicuro che sia un numero
            participantsCount: participantsCount, // Assicuro che sia un numero
          };
        })
      )
    );
  }

  getEventById(partnerId: string, eventId: string): Observable<Event> {
    const url = `${this.apiUrl}/${partnerId}/events/${eventId}`; // URL aggiornata per ottenere un evento specifico
    return this.http.get<Event>(url).pipe(
      map(event => {
        const maxParticipants = event.maxParticipants;
        const participantsCount = event.participantsCount;

        return {
          ...event,
          date: new Date(event.date),
          timeRemaining: '',
          maxParticipants: maxParticipants,
          participantsCount: participantsCount,
        };
      })
    );
  }
}
