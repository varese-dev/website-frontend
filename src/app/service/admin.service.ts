import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface CreateTalkRequest {
  talk: Talk;
  tagNames: string[];
}

export interface EventRequest {
  event: {
    id?: string;
    title: string;
    description: string;
    date: Date;
    start: string;
    end: string;
    maxParticipants: number;
    address: string;
    tags?: Tag[];
    talks?: Talk[];
    participantsCount?: number;
  };
}

interface PartnerRequest {
  partner: Partner;
}

export interface Speaker {
  talk: string[];
  userId: string;
  id: string;
  name: string;
  surname: string;
  biography: string;
  linkedin: string;
  image: string;
}

export interface Tag {
  id: string;
  name: string;
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

export interface Talk {
  id: string;
  title: string;
  description: string;
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
  talks?: Talk[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080';
  private talkUrl = 'http://localhost:8080/talks';
  private eventUrl = 'http://localhost:8080/events';
  private partnerUrl = 'http://localhost:8080/partners';
  private speakerUrl = 'http://localhost:8080/speakers';
  private tagUrl = 'http://localhost:8080/tags';

  constructor(private http: HttpClient) {
  }

  // Crea un nuovo evento
  createEvent(request: EventRequest): Observable<Event> {
    return this.http.post<Event>(this.eventUrl, request, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna un evento esistente
  updateEvent(id: string, request: EventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.eventUrl}/${id}`, request, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Ottieni un evento tramite ID
  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventUrl}/${id}`, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuovo partner
  createPartner(request: PartnerRequest): Observable<Partner> {
    return this.http.post<Partner>(this.partnerUrl, request, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna un partner esistente
  updatePartner(id: string, partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`${this.partnerUrl}/${id}`, partner, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Ottieni un partner tramite ID
  getPartnerById(id: string): Observable<Partner> {
    return this.http.get<Partner>(`${this.partnerUrl}/${id}`, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuovo speaker
  createSpeaker(speaker: Speaker): Observable<Speaker> {
    return this.http.post<Speaker>(this.speakerUrl, speaker, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna uno speaker esistente
  updateSpeaker(id: string, speaker: Speaker): Observable<Speaker> {
    return this.http.put<Speaker>(`${this.speakerUrl}/${id}`, speaker, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Ottieni uno speaker tramite ID
  getSpeakerById(id: string): Observable<Speaker> {
    return this.http.get<Speaker>(`${this.speakerUrl}/${id}`, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuovo tag
  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.tagUrl, tag, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna un tag esistente
  updateTag(id: string, tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.tagUrl}/${id}`, tag, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Ottieni un tag tramite ID
  getTagById(id: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.tagUrl}/${id}`, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Crea un nuovo talk
  createTalk(request: CreateTalkRequest): Observable<Talk> {
    return this.http.post<Talk>(this.talkUrl, request, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Aggiorna un talk esistente
  updateTalk(id: string, talk: Talk): Observable<Talk> {
    return this.http.put<Talk>(`${this.talkUrl}/${id}`, talk, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  // Ottieni un talk tramite ID
  getTalkById(id: string): Observable<Talk> {
    return this.http.get<Talk>(`${this.talkUrl}/${id}`, {withCredentials: true}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error fetching data:', error);
    return throwError('Si è verificato un errore. Riprova più tardi.');
  }
}
