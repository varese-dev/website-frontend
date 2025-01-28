import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definisci l'interfaccia per la risposta
export interface Relatore {
  name: string;
  surname: string;
  biography: string;
  imageUrl: string;
  profileLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriService {
  private apiUrl = 'http://localhost:8080/speakers'; // Endpoint API

  constructor(private http: HttpClient) { }

  // Metodo per ottenere i dati dei relatori
  getRelatori(): Observable<Relatore[]> {
    return this.http.get<Relatore[]>(this.apiUrl);
  }
}
