import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import necessario
import { ActivatedRoute } from '@angular/router';
import { EventsService, Event } from '../../../service/events.service';

@Component({
  selector: 'app-eventi-details',
  standalone: true,
  imports: [CommonModule],  // Aggiunto CommonModule per *ngIf e date pipe
  templateUrl: './eventi-details.component.html',
  styleUrls: ['./eventi-details.component.css']
})
export class EventiDetailsComponent implements OnInit {
  event: Event | null = null;  // Inizializzato a null per evitare errori
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.eventsService.getEventById(id).subscribe({
        next: (eventData: Event) => {
          this.event = eventData;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore nel recupero dei dettagli evento', err);
          this.error = 'Errore nel recupero dei dettagli evento';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID evento non valido';
      this.loading = false;
    }
  }
}
