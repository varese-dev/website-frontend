import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('mainHeader', { static: true }) mainHeader!: ElementRef;
  isScrolled = false;

  constructor(private router: Router) {}

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
