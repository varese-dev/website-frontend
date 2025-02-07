import { Component, AfterViewInit, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventService, Event } from '../../service/event-card.service';
import { format, toZonedTime } from 'date-fns-tz';
import Swiper, { EffectCards, Navigation, Pagination, Keyboard, Mousewheel } from 'swiper';
import 'swiper/swiper-bundle.css';
import gsap from 'gsap';

export interface ExtendedEvent extends Event {
  formattedDate: string;
  timeRemaining: string;
  remainingSlots: number;
}
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeroComponent implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  currentSectionIndex: number = 0;

  events: ExtendedEvent[] = [];
  currentIndex = 0;
  countdownInterval: any;


  constructor(private eventService: EventService, private el: ElementRef) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  ngAfterViewInit(): void {
    this.initParticles();
    this.initSwiper();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data.map((event) => ({
        ...event,
        formattedDate: this.formatDate(new Date(event.date)),
        timeRemaining: this.getTimeRemaining(new Date(event.date)),
        remainingSlots: event.maxParticipants - event.participantsCount,
      }));
      this.startCountdown();

      setTimeout(() => {
        const swiper = new Swiper('.swiper-cards-stack', {
          effect: 'cards',
          grabCursor: true,
        });
        swiper.update(); // Forza l'aggiornamento
      }, 100);
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
    if (days > 0) {
      return `${days}d`;
    }
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    return `${hours}h`;
  }

  private initSwiper(): void {
    Swiper.use([EffectCards, Navigation, Pagination, Keyboard, Mousewheel]);

    new Swiper('.swiper-cards-stack', {
      effect: 'cards',
      grabCursor: true,
      loop: true,               
      pagination: {
        el: '.swiper-pagination',
        clickable: true,     
      },
      keyboard: {
        enabled: true,          
      },
      mousewheel: {
        invert: false,         
      },
    });
  }

  private initParticles(): void {
    const canvas: HTMLCanvasElement = document.getElementById('particleCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    let particlesArray: Particle[] = [];
    let numParticles = window.innerWidth < 768 ? 50 : 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      numParticles = window.innerWidth < 768 ? 50 : 100;
      for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();
  }


  animateHeroContent(): void {
    gsap.from('.hero-text-section', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out',
    });

    gsap.from('.event-card.active', {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: 'power3.out',
    });
  }

  onGetStarted(): void {
    this.scrollToSectionByIdEvent('event');
  }

  scrollToAbout(): void {
    this.scrollToSectionByIdAbout('about');
  }

  scrollToSectionByIdAbout(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });


    }
  }

  scrollToSectionByIdEvent(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
    }
  }
}
