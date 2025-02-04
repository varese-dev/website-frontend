import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  EventsService,
  Event,
  Talk,
  Speaker,
} from '../../../service/events.service';

@Component({
  selector: 'app-eventi-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventi-details.component.html',
  styleUrls: ['./eventi-details.component.css'],
})
export class EventiDetailsComponent implements OnInit {
  event: Event | null = null;
  talks: Talk[] = [];
  loading: boolean = true;
  error: string | null = null;
  talksLoaded: number = 0; // Contatore per verificare quando tutti i talks sono caricati

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef // Forza aggiornamento UI
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam); // Converti id in number
      this.eventsService.getEventById(id).subscribe({
        next: (eventData: Event) => {
          this.event = eventData;
          this.loadTalks(Number(eventData.id)); // Converto eventData.id in number
        },
        error: (err) => {
          console.error('Errore nel recupero dei dettagli evento', err);
          this.error = 'Errore nel recupero dei dettagli evento';
          this.loading = false;
        },
      });
    } else {
      this.error = 'ID evento non valido';
      this.loading = false;
    }
  }

  loadTalks(eventId: number): void {
    this.eventsService.getTalksByEventId(eventId).subscribe({
      next: (talks: Talk[]) => {
        this.talks = talks;
        this.talksLoaded = 0; // Reset contatore

        if (talks.length === 0) {
          this.loading = false; // Se non ci sono talk, smetti di caricare
        } else {
          talks.forEach((talk) => this.loadSpeakers(talk));
        }
      },
      error: () => {
        console.error('Errore nel caricamento dei talks');
        this.loading = false;
      },
    });
  }

  loadSpeakers(talk: Talk): void {
    this.eventsService.getSpeakersByTalkId(talk.id).subscribe({
      next: (speakers: Speaker[]) => {
        talk.speakers = speakers;
        this.talksLoaded++;

        if (this.talksLoaded === this.talks.length) {
          this.loading = false; // Tutti i talk hanno caricato i relatori
        }
        this.cdr.detectChanges(); // Forza l'aggiornamento della UI
      },
      error: () => {
        console.error(
          `Errore nel caricamento dei relatori per il talk ${talk.id}`
        );
        this.talksLoaded++;

        if (this.talksLoaded === this.talks.length) {
          this.loading = false;
        }
      },
    });
  }

  getSpeakerNames(talk: Talk): string {
    return talk.speakers && talk.speakers.length
      ? talk.speakers.map((s) => `${s.name} ${s.surname}`).join(', ') // <-- Mostra nome + cognome
      : 'Nessun relatore disponibile';
  }
}
