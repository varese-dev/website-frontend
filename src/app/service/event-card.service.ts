import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Event {
  title: string;
  description: string;
  date: Date;
  timeRemaining?: string; 
  max_participants: number;   
  participants_count: number; 
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
        events.map(event => {
          // Converto i valori in numeri e se non sono validi imposto a 0
          const maxParticipants = this.convertToNumber(event.max_participants);
          const participantsCount = this.convertToNumber(event.participants_count);

          console.log(`Event Title: ${event.title}`);
          console.log(`Max Participants: ${maxParticipants}`);
          console.log(`Participants Count: ${participantsCount}`);
          console.log(`Remaining Slots: ${maxParticipants - participantsCount}`);

          return {
            ...event,
            date: new Date(event.date), // Converte la stringa in Date
            timeRemaining: '',           // Inizializza per evitare undefined
            max_participants: maxParticipants, // Assicuro che sia un numero
            participants_count: participantsCount, // Assicuro che sia un numero
          };
        })
      )
    );
  }

  // Funzione per garantire che il valore sia un numero valido
  private convertToNumber(value: any): number {
    const numberValue = Number(value);
    return isNaN(numberValue) ? 0 : numberValue;
  }

  getEventById(id: string): Observable<Event> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Event>(url).pipe(
      map(event => {
        const maxParticipants = this.convertToNumber(event.max_participants);
        const participantsCount = this.convertToNumber(event.participants_count);

        return {
          ...event,
          date: new Date(event.date),
          timeRemaining: '',
          max_participants: maxParticipants,
          participants_count: participantsCount,
        };
      })
    );
  }
}
