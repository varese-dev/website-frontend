import { Component, signal, computed, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../components/partner/partner.component.html',
  styleUrls: ['../../components/partner/partner.component.css']
})

export class PartnerComponent implements OnInit, OnDestroy {
  slides = [
    { image: '/images/partners/partner1.png', alt: 'Slide 1', link: 'https://www.reti.it' },
    { image: '/images/partners/partner2.png', alt: 'Slide 2', link: 'https://www.notjustl.com' },
    { image: '/images/partners/partner3.png', alt: 'Slide 3', link: 'https://www.varesenext.com' },
    { image: '/images/partners/partner4.png', alt: 'Slide 4', link: 'https://www.digitiamol.com' },
    { image: '/images/partners/partner5.png', alt: 'Slide 5', link: 'https://www.elmec.com' }
  ];

  constructor(private el: ElementRef) { }

  private indexSignal = signal(0);
  private intervalId: any;

  currentIndex = computed(() => this.indexSignal());

  ngOnInit() {
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  initAnimations() {
    gsap.to('.partners-section .animated-content', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.partners-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.indexSignal.set((this.indexSignal() + 1) % this.slides.length);
    }, 3000);
  }

}
