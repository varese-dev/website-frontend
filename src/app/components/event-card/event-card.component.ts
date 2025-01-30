import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
  slides = [
    {
      title: 'Varese Developer Group',
      description:
        'Unisciti alla nostra community per eventi di coding, networking e condivisione di progetti con altri sviluppatori della zona.',
      date: new Date('2025-03-10'),
    },
    {
      title: 'Workshop Angular',
      description:
        'Partecipa a un workshop pratico su Angular e scopri come creare web app moderne, performanti e scalabili da zero.',
      date: new Date('2025-04-01'),
    },
    {
      title: 'Coding Marathon',
      description:
        "Affronta una sfida di programmazione intensa! Lavora su progetti stimolanti e dimostra le tue abilità in un'atmosfera competitiva.",
      date: new Date('2025-05-15'),
    },
    {
      title: 'Conferenza sulla tecnologia',
      description:
        'Scopri le ultime tendenze tech con speaker di alto livello! Un’occasione unica per aggiornarti e fare networking nel settore.',
      date: new Date('2025-06-20'),
    },
    {
      title: 'Hackathon Varese',
      description:
        'Collabora con altri dev, sviluppa soluzioni innovative e competi per vincere premi esclusivi in un hackathon entusiasmante.',
      date: new Date('2025-07-05'),
    },
    {
      title: 'Riunione del gruppo',
      description:
        'Incontra la community di sviluppatori locali, condividi esperienze, idee e scopri nuove opportunità di crescita professionale.',
      date: new Date('2025-08-10'),
    },
  ];

  currentIndex = 0;
  autoplayInterval: any;

  constructor() {
    this.startAutoplay();
  }

  get visibleSlides() {
    return this.slides.slice(this.currentIndex, this.currentIndex + 1);
  }

  getTotalPages(): number[] {
    return Array.from({ length: this.slides.length });
  }

  get currentPage(): number {
    return this.currentIndex;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  goToSlide(pageIndex: number) {
    this.currentIndex = pageIndex;
  }

  trackByFn(index: number, item: any) {
    return index;
  }

  getTimeRemaining(date: Date) {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); 
  }
}
