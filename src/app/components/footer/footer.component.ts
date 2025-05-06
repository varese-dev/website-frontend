import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @ViewChild('footer', { static: true }) footer!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.footer.nativeElement, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.in',
    });
  }
}
