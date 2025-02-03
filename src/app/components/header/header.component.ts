import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import gsap from 'gsap';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('mainHeader', { static: true }) mainHeader!: ElementRef;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngAfterViewInit() {
    gsap.from(this.mainHeader.nativeElement, {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
    });
  }

  onSearch(): void {
    console.log('Search clicked');
    // Logica per aprire la ricerca
  }

  onLogin(): void {
    console.log('Login clicked');
  }
}