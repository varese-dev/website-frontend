import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit, OnDestroy {
  title = 'nome-del-progetto';

  slides = [
    { image: 'retilogo.png', alt: 'Slide 1', link: 'https://www.reti.it' },
    { image: 'notjustl.png', alt: 'Slide 2', link: 'https://www.notjustl.com' },
    { image: 'varesenextl.png', alt: 'Slide 3', link: 'https://www.varesenext.com' },
    { image: 'digitiamol.png', alt: 'Slide 4', link: 'https://www.digitiamol.com' },
    { image: 'elmecl.png', alt: 'Slide 5', link: 'https://www.elmec.com' }
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
