import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface Relatore {
  talk: string[];
  userId: string;
  id: string;
  name: string;
  surname: string;
  biography: string;
  linkedin: string;
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
}


@Injectable({
  providedIn: 'root',
})
export class RelatoriService {
  private apiUrl = 'http://localhost:8080/speakers';
  private talksApiUrl = 'http://localhost:8080/talks';


  constructor(private http: HttpClient) {
  }

  getRelatori(): Observable<Relatore[]> {
    return this.http.get<Relatore[]>(this.apiUrl).pipe(catchError(this.handleError));
  }


  getRelatoreById(id: string): Observable<Relatore> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Relatore>(url).pipe(catchError(this.handleError));
  }

  getEventsBySpeakerId(id: string): Observable<Event[]> {
    const url = `${this.apiUrl}/${id}/events`;
    return this.http.get<Event[]>(url).pipe(catchError(this.handleError));
  }


  getSpeakersByTalkId(id: string): Observable<Talk[]> {
    const url = `${this.apiUrl}/${id}/talks`;
    return this.http.get<Talk[]>(url).pipe(catchError(this.handleError));
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log error
    return throwError('Something went wrong with the request. Please try again later.');
  }
}

