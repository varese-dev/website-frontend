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

  onGetStarted(): void {
    this.scrollToSectionByIdEvent('event');
  }

  scrollToAbout(): void {
    this.scrollToSectionByIdAbout('about');
  }

  scrollToSectionByIdAbout(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });


    }
  }

  scrollToSectionByIdEvent(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
    }
  }
}
