import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  PartnerCardService,
  Event,
  Partner,
} from '../../../service/partner-card.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-partner-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.css'],
})
export class PartnerDetailsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  partnerId: string | null = null;
  partner: Partner | null = null;

  constructor(
    private partnerCardService: PartnerCardService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id');
    console.log('ID Partner selezionato:', this.partnerId);

    if (this.partnerId) {
      this.loadPartnerDetails(this.partnerId);
      this.loadEvents(this.partnerId);
    }
  }

  loadEvents(partnerId: string): void {
    this.partnerCardService.getEventsByPartnerId(partnerId).subscribe(
      (data: Event[]) => {
        this.events = data;
        if (data.length > 0) {
          this.titleService.setTitle(`${data[0].title} - Eventi`);
        }
        console.log('Eventi caricati:', this.events);
      },
      (error) => {
        console.error('Errore nel recupero degli eventi:', error);
      }
    );
  }

  loadPartnerDetails(partnerId: string): void {
    this.partnerCardService.getPartnerById(partnerId).subscribe(
      (data: Partner) => {
        this.partner = data;
        console.log('Dettagli partner caricati:', this.partner);
      },
      (error) => {
        console.error('Errore nel recupero dei dettagli del partner:', error);
      }
    );
  }

  ngOnDestroy(): void {}

  getTimeRemaining(event: Event): string {
    const now = new Date();
    const diff = event.date.getTime() - now.getTime();

    if (diff <= 0) {
      return 'Evento terminato';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let timeRemaining = '';
    if (days > 0) timeRemaining += `${days} giorni${days > 1 ? '' : ''} `;

    return timeRemaining;
  }

  getFormattedDate(event: Event): string {
    if (event.date instanceof Date && !isNaN(event.date.getTime())) {
      return new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(event.date);
    }
    return 'Data non disponibile';
  }
}
