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

export interface Partner {
  id: string;
  name: string;
  description: string;
  place: string;
  website: string;
  email: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PartnerCardService {
  private apiUrl = 'http://localhost:8080/partners';

  constructor(private http: HttpClient) {}

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl).pipe(
      map((data) => {
        console.log('Dati partner ricevuti dall’API:', data);
        return data.sort((a, b) => Number(a.id) - Number(b.id));
      })
    );
  }

  getEventsByPartnerId(partnerId: string): Observable<Event[]> {
    const url = `${this.apiUrl}/${partnerId}/events`;
    return this.http.get<any[]>(url).pipe(
      map((events) => {
        console.log('Dati eventi ricevuti dall’API:', events);
        return events.map((event) => ({
          title: event.title || 'Evento non specificato', // Assicurati che il campo title sia utilizzato
          description: event.description,
          date: new Date(event.date),
          timeRemaining: '', 
          maxParticipants: event.max_participants,
          participantsCount: event.participants_count,
        })) as Event[];
      })
    );
  }

  getPartnerById(partnerId: string): Observable<Partner> {
    const url = `${this.apiUrl}/${partnerId}`;
    return this.http.get<any>(url).pipe(
      map((data) => {
        console.log('Dati partner ricevuti dall’API:', data);
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          place: data.place,
          website: data.website,
          email: data.email,
          image: data.image,
        } as Partner;
      })
    );
  }
}
