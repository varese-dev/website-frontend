import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  timelineEvents: TimelineEvent[] = [
    {
      year: 'LUGLIO 2023',
      title: 'Nascita di Python Varese',
      description:
        "Nel Luglio 2023, Fabio Barbazza, appassionato di Python, organizza il primo evento 'PyBeer' su LinkedIn. Alcuni programmatori si ritrovano in un locale di Varese e nasce il canale Telegram 'Python Varese'.",
      image: '/images/about/pyvarese.png',
    },
    {
      year: 'OTTOBRE 2023',
      title: 'Secondo PyBeer e Crescita della Community',
      description:
        "A Ottobre 2023, Dario Bertolino si unisce all'organizzazione. Matteo Bilotta, insieme a Marco Beri, partecipa al secondo PyBeer, consolidando la community.",
      image: '/images/about/aperitivojs.png',
    },
    {
      year: 'FEBBRAIO 2024',
      title: 'Lancio di Vue.js Varese',
      description:
        "A Febbraio 2024, Matteo Bilotta, con la sua passione per il frontend, crea il gruppo Telegram 'Vue.js Varese' per far conoscere il framework tra i professionisti locali.",
      image: '/images/about/vuejs-varese.png',
    },
    {
      year: 'GIUGNO 2024',
      title: 'Primo Evento Combinato',
      description:
        'A Giugno 2024 viene organizzato il primo evento combinato in Elmec, unendo le community e dimostrando la sinergia tra le diverse tecnologie.',
      image: '/images/about/code_cheers.png',
    },
    {
      year: 'DICEMBRE 2024',
      title: 'Nascita del Varese Developer Group',
      description:
        'Rendendosi conto che rimanere confinati in specifiche tecnologie era limitante, gli organizzatori decidono di unire le community sotto un unico cappello: Varese Developer Group, per dare maggior visibilità e risonanza al mondo tech.',
      image: '/images/logo/logoVDG.png',
    },
  ];

  currentIndex: number = 0;
  autoScrollInterval: any;
  lenis!: Lenis;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.startAutoScroll();

    gsap.to('.about-section .animated-content', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
    this.lenis.destroy();
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
    }, 6000);
  }

  private isAnimating: boolean = false;

  private animateStepChange(): void {
    if (this.isAnimating) return; // Blocca se c'è già un'animazione in corso
    this.isAnimating = true;

    const current = document.querySelector('.step-content') as HTMLElement;

    // Crea una nuova card
    const newContent = current.cloneNode(true) as HTMLElement;

    // Aggiorna il contenuto della nuova card
    newContent.querySelector('h3')!.textContent = this.currentEvent.title;
    newContent.querySelector('p')!.textContent = this.currentEvent.description;
    newContent.querySelector('.step-date')!.textContent = this.currentEvent.year;
    const newImage = newContent.querySelector('img')!;
    newImage.src = this.currentEvent.image;
    newImage.alt = this.currentEvent.title;

    // Posiziona la nuova card sopra l'attuale nel layout
    current.insertAdjacentElement('afterend', newContent);

    // Aggiungi uno stile temporaneo per la nuova card
    newContent.style.position = 'absolute';
    newContent.style.zIndex = '2';
    gsap.set(newContent, { opacity: 0 });

    // Anima la scomparsa della card attuale
    gsap.to(current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        current.remove(); // Rimuove la card dopo l'animazione
      },
    });

    // Anima l'entrata della nuova card
    gsap.to(newContent, {
      opacity: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        // Rimuovi z-index e flag temporanei dopo l'animazione
        newContent.style.position = '';
        newContent.style.zIndex = '';
        this.isAnimating = false; // Libera il flag dopo l'animazione
      },
    });
  }
}