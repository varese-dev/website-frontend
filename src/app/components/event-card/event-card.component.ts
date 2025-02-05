import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../../service/event-card.service';
import { format, toZonedTime } from 'date-fns-tz';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ExtendedEvent extends Event {
  formattedDate: string;
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
export class EventCardComponent implements OnInit, AfterViewInit, OnDestroy {
  events: ExtendedEvent[] = [];
  currentIndex = 0;
  countdownInterval: any;

  constructor(private eventService: EventService, private el: ElementRef) { }

  ngOnInit() {
    this.loadEvents();
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      console.log('Event data received:', data);
      this.events = data.map((event) => ({
        ...event,
        formattedDate: this.formatDate(new Date(event.date)),
        timeRemaining: this.getTimeRemaining(new Date(event.date)),
        remainingSlots: event.maxParticipants - event.participantsCount,
      }));
      this.startCountdown();
    });
  }

  initAnimations() {
    gsap.to('.event-section .animated-content', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.event-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  formatDate(date: Date): string {
    const timeZone = 'Europe/Rome';
    const zonedDate = toZonedTime(date, timeZone);

    const day = String(zonedDate.getDate()).padStart(2, '0');
    const month = String(zonedDate.getMonth() + 1).padStart(2, '0');
    const year = zonedDate.getFullYear();
    const hours = String(zonedDate.getHours()).padStart(2, '0');
    const minutes = String(zonedDate.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ore: ${hours}:${minutes}`;
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
    this.currentIndex = this.currentIndex === 0 ? this.events.length - 1 : this.currentIndex - 1;
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
    if (days > 0) {
      return `${days}d`;
    }

    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    return `${hours}h`;
  }
}
