import { Component, AfterViewInit, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
})
export class HeroComponent implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  currentSectionIndex: number = 0;

  public currentCardIndex: number = 0

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.animateSection(this.sections.first.nativeElement); // Anima la prima sezione al caricamento
    this.initScrollAnimations();
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

  initScrollAnimations(): void {
    this.sections.forEach((section) => {
      const sectionId = section.nativeElement.id;

      if (sectionId === 'about') {
        gsap.fromTo(
          '.animated-content',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              id: sectionId,
              trigger: section.nativeElement,
              start: 'top 80%',
              toggleActions: 'play none none none', // Non torna indietro
              once: true, // Si anima una sola volta
            },
          }
        );
      }
    });
  }

  // Scroll Handler per lo scrolling tra sezioni
  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (event.deltaY > 0) {
      this.scrollToNextSection();
    } else {
      this.scrollToPreviousSection();
    }
  }

  scrollToNextSection(): void {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  scrollToPreviousSection(): void {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.currentSectionIndex);
    }
  }

  scrollToSection(index: number): void {
    const section = this.sections.toArray()[index].nativeElement;
    const offset = 80; // Offset di 80px
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: sectionPosition, behavior: 'smooth' });

    // Anima la sezione dopo lo scroll
    setTimeout(() => this.animateSection(section), 500);
  }

  // Animazione della sezione attiva
  animateSection(section: HTMLElement): void {
    const sectionId = section.id;

    // Anima diversi elementi in base alla sezione
    if (sectionId === 'hero') {
      gsap.fromTo(
        '.hero-text-section',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );
    } else if (sectionId === 'about') {
      gsap.from('.animated-content', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }

  // Navigazione ai componenti specifici tramite pulsanti
  onGetStarted(): void {
    this.scrollToSectionById('event-card');
  }

  scrollToAbout(): void {
    this.scrollToSectionById('about');
  }

  scrollToSectionById(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Offset di 80px
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;
  
      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
      
      // Non richiamare animateSection se c'è un ScrollTrigger per quella sezione
      if (!ScrollTrigger.getById(sectionId)) {
        setTimeout(() => this.animateSection(section), 500);
      }
    }
  }
}
