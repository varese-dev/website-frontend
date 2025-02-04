import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trigger, transition, style, animate } from '@angular/animations';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    // Animazione di entrata durante lo scroll
    trigger('scrollAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

    // Animazione di switch tra eventi della timeline
    trigger('switchEventAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  timelineEvents: TimelineEvent[] = [
    {
      year: 'LUG 23',
      title: 'Nascita di Python Varese',
      description:
        "Nel Luglio 2023, Fabio Barbazza, appassionato di Python, organizza il primo evento 'PyBeer' su LinkedIn. Alcuni programmatori si ritrovano in un locale di Varese e nasce il canale Telegram 'Python Varese'.",
      image: '/images/about/pyvarese.png',
    },
    {
      year: 'OTT 23',
      title: 'Secondo PyBeer e Crescita della Community',
      description:
        "A Ottobre 2023, Dario Bertolino si unisce all'organizzazione. Matteo Bilotta, insieme a Marco Beri, partecipa al secondo PyBeer, consolidando la community.",
      image: 'aperitivojs.png',
    },
    {
      year: 'FEB 24',
      title: 'Lancio di Vue.js Varese',
      description:
        "A Febbraio 2024, Matteo Bilotta, con la sua passione per il frontend, crea il gruppo Telegram 'Vue.js Varese' per far conoscere il framework tra i professionisti locali.",
      image: 'vuejs-varese.png',
    },
    {
      year: 'GIU 24',
      title: 'Primo Evento Combinato',
      description:
        'A Giugno 2024 viene organizzato il primo evento combinato in Elmec, unendo le community e dimostrando la sinergia tra le diverse tecnologie.',
      image: 'code_cheers.png',
    },
    {
      year: 'DIC 24',
      title: 'Nascita del Varese Developer Group',
      description:
        'Rendendosi conto che rimanere confinati in specifiche tecnologie era limitante, gli organizzatori decidono di unire le community sotto un unico cappello: Varese Developer Group, per dare maggior visibilità e risonanza al mondo tech.',
      image: 'logovarese.png',
    },
  ];

  currentIndex: number = 0;
  autoScrollInterval: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initAnimations();
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  get currentEvent(): TimelineEvent {
    return this.timelineEvents[this.currentIndex];
  }

  get progressWidth(): number {
    return ((this.currentIndex + 1) / this.timelineEvents.length) * 100;
  }

  selectEvent(index: number): void {
    this.currentIndex = index;
    this.animateStepChange();
  }

  private startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.timelineEvents.length;
      this.animateStepChange();
    }, 4000); // Cambia step ogni 4 secondi
  }

  private animateStepChange(): void {
    gsap.to('.step-content', {
      opacity: 0,
      x: -30,
      duration: 0.5,
      onComplete: () => {
        gsap.fromTo(
          '.step-content',
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
        );
      },
    });

    gsap.to('.progress-line', {
      width: `${this.progressWidth}%`,
      duration: 0.5,
      ease: 'power3.out',
    });

    const steps = this.elementRef.nativeElement.querySelectorAll('.step');
    steps.forEach((step: HTMLElement, index: number) => {
      step.classList.toggle('active', index === this.currentIndex);
    });
  }

  private initAnimations(): void {
    gsap.fromTo(
      '.fade-in',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fade-in',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}