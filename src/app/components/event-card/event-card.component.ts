import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit, AfterViewInit, OnDestroy {
  events: ExtendedEvent[] = [];
  currentIndex = 0;
  countdownInterval: any;

  constructor(private eventService: EventService, private el: ElementRef) {}

  ngOnInit() {
    this.loadEvents();
  }

  ngAfterViewInit(): void {
    this.initParticles();
    this.initAnimations();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private initParticles(): void {
    const canvas: HTMLCanvasElement = document.getElementById('particleCanvasEvent') as HTMLCanvasElement;
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
    this.animateSlideTransition('next');
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.events.length;
    }, 300);
  }

  previousSlide() {
    this.animateSlideTransition('prev');
    setTimeout(() => {
      this.currentIndex = this.currentIndex === 0 ? this.events.length - 1 : this.currentIndex - 1;
    }, 300);
  }

  goToSlide(pageIndex: number) {
    this.animateIndicatorTransition(pageIndex);
    this.animateSlideTransition(pageIndex > this.currentIndex ? 'next' : 'prev');
    setTimeout(() => {
      this.currentIndex = pageIndex;
    }, 300);
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

  private animateSlideTransition(direction: 'next' | 'prev') {
    const slideContainer = this.el.nativeElement.querySelector('.slides');
    const animationDuration = 0.7;

    gsap.fromTo(
      slideContainer,
      { x: direction === 'next' ? '100%' : '-100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: animationDuration, ease: 'power2.out' }
    );
  }

  private animateIndicatorTransition(targetIndex: number) {
    const indicators = this.el.nativeElement.querySelectorAll('.indicator');
    gsap.to(indicators, {
      scale: 0.8,
      opacity: 0.5,
      duration: 0.7,
      ease: 'power1.inOut',
      onComplete: () => {
        indicators.forEach((indicator: any, index: number) => {
          gsap.to(indicator, {
            scale: index === targetIndex ? 1.2 : 1,
            opacity: index === targetIndex ? 1 : 0.5,
            duration: 0.7,
            ease: 'power1.out',
          });
        });
      },
    });
  }
}
