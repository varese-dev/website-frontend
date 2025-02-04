import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  EventsService,
  Event,
  Talk,
  Tag,
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

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventsService.getEventById(idParam).subscribe({
        next: (eventData: Event) => {
          this.event = eventData;
          this.talks = eventData.talks || [];
          this.talks.forEach((talk) => this.loadTalkDetails(talk));
        },
        error: (err) => {
          console.error('Errore nel recupero dei dettagli evento', err);
          this.error = 'Errore nel recupero dei dettagli evento';
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
    } else {
      this.error = 'ID evento non valido';
      this.loading = false;
    }
  }

  loadTalkDetails(talk: Talk): void {
    // Carica i relatori
    this.eventsService.getSpeakersByTalkId(talk.id).subscribe({
      next: (speakers: Speaker[]) => {
        talk.speakers = speakers;
        this.cdr.detectChanges();
      },
      error: () => console.error(`Errore nel caricamento dei relatori per il talk ${talk.id}`),
    });

    // Carica i tag
    this.eventsService.getTagsByTalkId(talk.id).subscribe({
      next: (tags: Tag[]) => {
        talk.tags = tags;
        this.cdr.detectChanges();
      },
      error: () => console.error(`Errore nel caricamento dei tag per il talk ${talk.id}`),
    });
  }

  getSpeakerNames(talk: Talk): string {
    return talk.speakers && talk.speakers.length
      ? talk.speakers.map((s) => `${s.name} ${s.surname}`).join(', ')
      : 'Nessun relatore disponibile';
  }

  getTalkTags(talk: Talk): string {
    return talk.tags && talk.tags.length
      ? talk.tags.map((tag) => tag.name).join(', ')
      : 'Nessun tag disponibile';
  }
}
