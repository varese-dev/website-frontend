import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

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
    // Animazione sleek fade down: parte da opacity 0 e translateY(-20px)
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  // Timeline events basati sulla storia reale del gruppo,
  // con etichette complete (mese e anno) nei pallini
  timelineEvents: TimelineEvent[] = [
    {
      year: 'LUG 23',
      title: 'Nascita di Python Varese',
      description:
        "Nel Luglio 2023, Fabio Barbazza, appassionato di Python, organizza il primo evento 'PyBeer' su LinkedIn. Alcuni programmatori si ritrovano in un locale di Varese e nasce il canale Telegram 'Python Varese'.",
      image: '/images/pyvarese.png',
    },
    {
      year: 'OTT 23',
      title: 'Secondo PyBeer e Crescita della Community',
      description:
        "A Ottobre 2023, Dario Bertolino si unisce all'organizzazione. Matteo Bilotta, insieme a Marco Beri, partecipa al secondo PyBeer, consolidando la community.",
      image: '/images/aperitivojs.png',
    },
    {
      year: 'FEB 24',
      title: 'Lancio di Vue.js Varese',
      description:
        "A Febbraio 2024, Matteo Bilotta, con la sua passione per il frontend, crea il gruppo Telegram 'Vue.js Varese' per far conoscere il framework tra i professionisti locali.",
      image: '/images/vuejs-varese.png',
    },
    {
      year: 'GIU 24',
      title: 'Primo Evento Combinato',
      description:
        'A Giugno 2024 viene organizzato il primo evento combinato in Elmec, unendo le community e dimostrando la sinergia tra le diverse tecnologie.',
      image: '/images/code_cheers.png',
    },
    {
      year: 'DIC 24',
      title: 'Nascita del Varese Developer Group',
      description:
        'Rendendosi conto che rimanere confinati in specifiche tecnologie era limitante, gli organizzatori decidono di unire le community sotto un unico cappello: Varese Developer Group, per dare maggior visibilità e risonanza al mondo tech.',
      image: '/images/logovarese.png',
    },
  ];

  // Indice dell'evento corrente
  currentIndex: number = 0;

  // Restituisce l'evento corrente
  get currentEvent(): TimelineEvent {
    return this.timelineEvents[this.currentIndex];
  }

  // Calcola la percentuale per la linea attiva.
  // Questa percentuale viene applicata al div .timeline-active-line.
  // Nota: con 5 eventi, se currentIndex = 0 => 0%, se currentIndex = 4 => 100%.
  get activePercentage(): number {
    if (this.timelineEvents.length <= 1) return 100;
    return (this.currentIndex / (this.timelineEvents.length - 1)) * 100;
  }

  constructor() {}

  ngOnInit(): void {}

  selectEvent(index: number): void {
    this.currentIndex = index;
  }
}
