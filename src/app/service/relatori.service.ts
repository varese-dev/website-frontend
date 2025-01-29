import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Relatore {
  name: string;
  surname: string;
  biography: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriService {
  private apiUrl = 'http://localhost:8080/speakers';

  constructor(private http: HttpClient) { }

  getRelatori(): Observable<Relatore[]> {
    return this.http.get<Relatore[]>(this.apiUrl);
  }
}
