import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerCardComponent } from "../../../partner-card/partner-card.component";
import { PartnerCardService } from '../../../service/partner-card.service'; // Assicurati di avere il corretto path
import { Title } from '@angular/platform-browser';  // Importa Title per modificare il titolo della pagina

export interface Event {
  title: string;
  description: string;
  date: Date;
  timeRemaining?: string;
  maxParticipants: number;
  participantsCount: number;
}

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, PartnerCardComponent],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css']
})
export class PartnerComponent implements OnInit, OnDestroy {

  events: Event[] = [];  // Array per contenere gli eventi

  constructor(private partnerCardService: PartnerCardService, private titleService: Title) {}

  ngOnInit() {
    this.loadEvents();  // Carica gli eventi quando il componente è inizializzato
  }

  loadEvents() {
    const partnerId = 'partner-id';  // Sostituisci con l'ID del partner che desideri (potresti passarla come input o calcolarla dinamicamente)
    
    // Chiamata per ottenere gli eventi del partner
    this.partnerCardService.getEventsByPartner(partnerId).subscribe(
      (data: Event[]) => {
        this.events = data;
        if (data && data.length > 0) {
          this.titleService.setTitle(data[0].title);  // Imposta il titolo della pagina usando il titolo del primo evento
        }
        console.log(this.events);  // Puoi loggare per verificare i dati
      },
      (error) => {
        console.error('Errore nel recupero degli eventi', error);  // Gestione errori
      }
    );
  }

  ngOnDestroy() {
    // Codice da eseguire alla distruzione del componente (ad esempio, per fare il cleanup)
  }
}
