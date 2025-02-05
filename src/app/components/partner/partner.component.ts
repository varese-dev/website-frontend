import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner2', // Verifica che il selettore sia corretto
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../components/partner/partner.component.html',
  styleUrls: ['../../components/partner/partner.component.css']
})

export class PartnerComponent implements OnInit, OnDestroy {
  title = 'nome-del-progetto';

  slides = [
    { image: '/images/retilogo.png', alt: 'Slide 1', link: 'https://www.reti.it' },
    { image: '/images/notjustl.png', alt: 'Slide 2', link: 'https://www.notjustl.com' },
    { image: '/images/varesenextl.png', alt: 'Slide 3', link: 'https://www.varesenext.com' },
    { image: '/images/digitiamol.png', alt: 'Slide 4', link: 'https://www.digitiamol.com' },
    { image: '/images/elmecl.png', alt: 'Slide 5', link: 'https://www.elmec.com' }
  ];

  private indexSignal = signal(0);
  private intervalId: any;

  currentIndex = computed(() => this.indexSignal());

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.indexSignal.set((this.indexSignal() + 1) % this.slides.length);
    }, 3000);
  }

}
