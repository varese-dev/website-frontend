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
    this.initParticles();
  }

  private initParticles(): void {
    const canvas: HTMLCanvasElement = document.getElementById('particleCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    let particlesArray: Particle[] = [];
    let numParticles = window.innerWidth < 768 ? 50 : 100; 

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      numParticles = window.innerWidth < 768 ? 50 : 100;  
      for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();
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
