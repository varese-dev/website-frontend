import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EventsService, Event } from '../../service/events.service';

@Component({
  selector: 'app-eventi',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css'],
})
export class EventiComponent implements OnInit {
  events: Event[] = [];
  searchTerm: string = '';
  futureEvents: Event[] = [];
  pastEvents: Event[] = [];

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.events.forEach(event => {
        this.eventsService.getTagsByEventId(event.id).subscribe(tags => {
          event.tags = tags;
        });
      });
      this.filterEvents();
    });
  }

  filterEvents(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.futureEvents = this.events.filter(event => {
      const matchesTitle = event.title.toLowerCase().includes(searchTermLower);
      const matchesTag = event.tags?.some(tag => tag.name.toLowerCase().includes(searchTermLower));
      return !this.isPastEvent(event) && (matchesTitle || matchesTag);
    });

    this.pastEvents = this.events.filter(event => {
      const matchesTitle = event.title.toLowerCase().includes(searchTermLower);
      const matchesTag = event.tags?.some(tag => tag.name.toLowerCase().includes(searchTermLower));
      return this.isPastEvent(event) && (matchesTitle || matchesTag);
    });
  }

  isPastEvent(event: Event): boolean {
    return new Date(event.date) < new Date();
  }

  participate(eventId: string): void {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    event.bookingMessage = '';  // Resetta il messaggio precedente

    this.eventsService.createBooking(eventId).subscribe({
      next: (response) => {
        if (response.success) {
          event.bookingMessage = 'Prenotazione effettuata con successo';
        } else {
          event.bookingMessage = response.message || 'Errore durante la prenotazione';
        }

        // Nascondi il messaggio dopo 5 secondi
        setTimeout(() => (event.bookingMessage = ''), 5000);
      },
      error: (error) => {
        console.error('Error creating booking', error);
        event.bookingMessage = error.status === 401 || error.status === 403
          ? 'Accedi per prenotare un evento'
          : 'Prenotazione fallita';
      },
      complete: () => {
        console.log('Booking request completed');
      },
    });
  }
}
