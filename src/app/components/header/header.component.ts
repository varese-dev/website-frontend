import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {
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

  navigateToAccount(): void {
    this.authService.getUserSession().subscribe({
      next: (sessionResponse) => {
        if (!sessionResponse || !sessionResponse.userId) {
          this.router.navigate(['/auth/account']);
          return;
        }

        this.authService.getUserRole(sessionResponse.userId).subscribe({
          next: (userResponse) => {
            const role = userResponse?.role?.toUpperCase();
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role === 'USER') {
              this.router.navigate(['/area-utente']);
            } else {
              this.router.navigate(['/auth/account']);
            }
          },
          error: () => {
            this.router.navigate(['/auth/account']);
          }
        });
      },
      error: () => {
        this.router.navigate(['/auth/account']);
      }
    });
  }
}
