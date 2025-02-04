import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../../app/service/event-card.service';

// Nuova interfaccia che estende Event, aggiungendo le proprietà calcolate
export interface ExtendedEvent extends Event {
  timeRemaining: string;
  remainingSlots: number;
}

@Component({
  selector: 'partner-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-card.component.html',  // Assicurati che il nome del file sia corretto
  styleUrls: ['./partner-card.component.css'],
})
export class PartnerCardComponent implements OnInit, OnDestroy {
  events: ExtendedEvent[] = [];
  currentIndex = 0;
  countdownInterval: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((data) => {
      console.log('Event data received:', data);

      // Mappiamo i dati per includere timeRemaining e remainingSlots
      this.events = data.map((event) => {
        const maxParticipants = event.maxParticipants;
        const participantsCount = event.participantsCount;

        console.log('Remaining Slots Calculation:', maxParticipants - participantsCount);

        return {
          ...event,
          date: new Date(event.date),
          timeRemaining: this.getTimeRemaining(new Date(event.date)),
          remainingSlots: maxParticipants - participantsCount,
        };
      });

      this.startCountdown();
    });
  }

  ngOnDestroy(): void {
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

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.events.length;
  }

  previousSlide(): void {
    this.currentIndex = this.currentIndex === 0 ? this.events.length - 1 : this.currentIndex - 1;
  }

  goToSlide(pageIndex: number): void {
    this.currentIndex = pageIndex;
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  startCountdown(): void {
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
