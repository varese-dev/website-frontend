import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('mainHeader', { static: true }) mainHeader!: ElementRef;
  isScrolled = false;
  isHomePage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.urlAfterRedirects === '/';
      }
    });
  }

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

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
