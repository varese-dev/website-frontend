import { Component, AfterViewInit, HostListener, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [],
})
export class HeroComponent implements AfterViewInit {
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  currentSectionIndex: number = 0;

  public currentCardIndex: number = 0

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.animateSection(this.sections.first.nativeElement); // Anima la prima sezione al caricamento
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

  switchCard(index: number): void {
    const cards = document.querySelectorAll('.event-card');
    const dots = document.querySelectorAll('.dot');

    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
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
    section.scrollIntoView({ behavior: 'smooth' });
    this.animateSection(section);
  }

  // Animazione della sezione attiva
  animateSection(section: HTMLElement): void {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
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
      section.scrollIntoView({ behavior: 'smooth' });
      this.animateSection(section);
    }
  }
}
