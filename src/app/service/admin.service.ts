import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://localhost:8443';

  constructor(private http: HttpClient) {}

  // Creazione evento
  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, eventData, { withCredentials: true });
  }

  // Creazione partner
  createPartner(partnerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/partners`, partnerData, { withCredentials: true });
  }

  // Creazione speaker
  createSpeaker(speakerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/speakers`, speakerData, { withCredentials: true });
  }

  // Creazione tag
  createTag(tagData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tags`, tagData, { withCredentials: true });
  }

  // Creazione talk
  createTalk(talkData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/talks`, talkData, { withCredentials: true });
  }
}
