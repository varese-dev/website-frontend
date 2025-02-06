import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-final-message',
  imports: [],
  templateUrl: './final-message.component.html',
  styleUrl: './final-message.component.css'
})
export class FinalMessageComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  initAnimations() {
    gsap.to('.contacts-section .animated-content', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contacts-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

}
