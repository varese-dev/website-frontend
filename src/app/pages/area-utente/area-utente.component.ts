import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-area-utente',
  templateUrl: './area-utente.component.html',
  styleUrls: ['./area-utente.component.css'],
  imports: [
    NgForOf
  ]

})
export class AreaUtenteComponent  {
  bookedEvents: any[] = [];
  participationHistory: any[] = [];

  //constructor(private http: HttpClient) {}

  /*ngOnInit(): void {
    this.fetchBookedEvents();
    this.fetchParticipationHistory();
  }

  // Metodo per ottenere gli eventi prenotati
  fetchBookedEvents() {
    // SOSTITUIRE CON L'ENDPOINT CORRETTO PER GLI EVENTI PRENOTATI
    const bookedEventsEndpoint = 'API_URL/booked-events'; // <-- SOSTITUIRE CON L'ENDPOINT REALE
    this.http.get<any[]>(bookedEventsEndpoint).subscribe(data => {
      this.bookedEvents = data;
    });
  }

  // Metodo per ottenere lo storico delle partecipazioni
  fetchParticipationHistory() {
    // SOSTITUIRE CON L'ENDPOINT CORRETTO PER LO STORICO DELLE PARTECIPAZIONI
    const participationHistoryEndpoint = 'API_URL/participation-history'; // <-- SOSTITUIRE CON L'ENDPOINT REALE
    this.http.get<any[]>(participationHistoryEndpoint).subscribe(data => {
      this.participationHistory = data;
    });
  }*/
}
