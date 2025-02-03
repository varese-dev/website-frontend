import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../../service/event-card.service';

// Nuova interfaccia che estende Event, aggiungendo le proprietà calcolate
export interface ExtendedEvent extends Event {
  timeRemaining: string;
  remainingSlots: number;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit, OnDestroy {
  events: ExtendedEvent[] = [];
  currentIndex = 0;
  countdownInterval: any;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      console.log('Event data received:', data);

      // Mappiamo i dati per includere timeRemaining e remainingSlots
      this.events = data.map((event) => {
        const maxParticipants = event.maxParticipants; // Forza la conversione in numero
        const participantsCount = event.participantsCount; // Forza la conversione in numero

        // Log per monitorare il calcolo dei posti rimanenti
        console.log('Remaining Slots Calculation:', maxParticipants - participantsCount);

        return {
          ...event,
          date: new Date(event.date),
          timeRemaining: this.getTimeRemaining(new Date(event.date)),
          remainingSlots: maxParticipants - participantsCount, // Calcolo dei posti rimanenti
        };
      });

      this.startCountdown();
    });
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  get visibleSlides() {
    return this.events.slice(this.currentIndex, this.currentIndex + 1);
  }

  getTotalPages(): number[] {
    return Array.from({ length: this.events.length });
  }

  get currentPage(): number {
    return this.currentIndex;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.events.length;
  }

  previousSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.events.length - 1 : this.currentIndex - 1;
  }

  goToSlide(pageIndex: number) {
    this.currentIndex = pageIndex;
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.events = this.events.map((event) => ({
        ...event,
        timeRemaining: this.getTimeRemaining(new Date(event.date)),
      }));
    }, 1000);
  }

  getTimeRemaining(date: Date): string {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();

    if (timeDiff <= 0) return 'Evento concluso';

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
