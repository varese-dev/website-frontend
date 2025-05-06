import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  Renderer2
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import gsap from 'gsap';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy, AfterViewInit {
  loginErrors = {
    contact: '',
    password: ''
  };

  registerErrors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  };

  contact: string = '';
  isEmail: boolean = true;
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  email: string = '';
  acceptTerms: boolean = false;

  showBothIcons: boolean = true;

  firstName: string = '';
  lastName: string = '';
  registerEmail: string = '';
  registerPhone: string = '';
  registerPassword: string = '';
  confirmPassword: string = '';
  passwordError: string = '';
  registrationErrorMessage: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isPasswordTyped: boolean = false;
  isRegistering: boolean = false;

  isLoginVisible: boolean = true;

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private animationId: number = 0;
  private lenis!: Lenis;

  @ViewChild('rendererContainer', {static: true}) rendererContainer!: ElementRef;
  @ViewChild('loginBox') loginBox!: ElementRef;
  @ViewChild('loginLeft') loginLeft!: ElementRef;
  @ViewChild('loginRight') loginRight!: ElementRef;
  @ViewChild('registerBox') registerBox!: ElementRef;
  @ViewChild('registerLeft') registerLeft!: ElementRef;
  @ViewChild('registerRight') registerRight!: ElementRef;

  constructor(private renderer2: Renderer2, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  private showRegisterSectionImmediately(): void {
    this.registerBox.nativeElement.style.visibility = 'visible';
    this.registerBox.nativeElement.style.opacity = '1';
    this.registerBox.nativeElement.style.transform = 'translateX(0%)';

    this.loginBox.nativeElement.style.visibility = 'hidden';
    this.loginBox.nativeElement.style.opacity = '0';
  }

  private showLoginSectionImmediately(): void {
    this.loginBox.nativeElement.style.visibility = 'visible';
    this.loginBox.nativeElement.style.opacity = '1';
    this.loginBox.nativeElement.style.transform = 'translateX(0%)';

    this.registerBox.nativeElement.style.visibility = 'hidden';
    this.registerBox.nativeElement.style.opacity = '0';
  }

  ngOnInit(): void {
    this.initLenis();
  }

  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;

    if (fragment === 'register') {
      this.isLoginVisible = false;
      this.showRegisterSectionImmediately();
    } else {
      this.isLoginVisible = true;
      this.showLoginSectionImmediately();
    }

    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'register') {
        this.switchToRegister();
      } else {
        this.switchToLogin();
      }
    });

    this.animateEntranceLogin();
    this.animateEntranceRegister();
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  validateInput(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    if (this.contact.length === 0) {
      this.showBothIcons = true;
    } else if (phonePattern.test(this.contact)) {
      this.showBothIcons = false;
      this.isEmail = false;
    } else {
      this.showBothIcons = false;
      this.isEmail = true;
    }
  }

  onPasswordInput(): void {
    this.isPasswordTyped = this.password.length > 0;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validatePasswords(): void {
    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      this.passwordError = 'Le password non coincidono.';
    } else {
      this.passwordError = '';
    }
  }

  private initLenis(): void {
    this.lenis = new Lenis({duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))});
    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  private animateEntranceLogin(): void {
    if (!this.loginLeft || !this.loginRight) {
      console.error('Gli elementi non sono stati inizializzati correttamente!');
      return;
    }

    const leftElement = this.loginLeft.nativeElement;
    const rightElement = this.loginRight.nativeElement;

    if (!leftElement || !rightElement) {
      console.error('Elementi ViewChild non trovati!');
      return;
    }

    gsap.set(leftElement, {x: '-100%', opacity: 0});
    gsap.set(rightElement, {x: '100%', opacity: 0});

    gsap.to(leftElement, {
      x: '0%',
      opacity: 1,
      duration: 2,
      ease: 'power3.out',
      delay: 0.7
    });

    gsap.to(rightElement, {
      x: '0%',
      opacity: 1,
      duration: 2,
      ease: 'power3.out',
      delay: 0.7
    });
  }

  private animateEntranceRegister(): void {
    if (!this.registerLeft || !this.registerRight) {
      console.error('Gli elementi non sono stati inizializzati correttamente!');
      return;
    }

    const leftElement = this.registerLeft.nativeElement;
    const rightElement = this.registerRight.nativeElement;

    if (!leftElement || !rightElement) {
      console.error('Elementi ViewChild non trovati!');
      return;
    }

    gsap.set(leftElement, {x: '-100%', opacity: 0});
    gsap.set(rightElement, {x: '100%', opacity: 0});

    gsap.to(leftElement, {
      x: '0%',
      opacity: 1,
      duration: 2,
      ease: 'power3.out',
      delay: 0.7
    });

    gsap.to(rightElement, {
      x: '0%',
      opacity: 1,
      duration: 2,
      ease: 'power3.out',
      delay: 0.7
    });
  }

  switchToRegister(): void {
    this.isLoginVisible = false;
    this.animateSwitchToRegister();
    this.router.navigate([], {fragment: 'register'});
  }

  switchToLogin(): void {
    this.isLoginVisible = true;
    this.animateSwitchToLogin();
    this.router.navigate([], {fragment: 'login'});
  }

  animateSwitchToRegister(): void {
    this.registerBox.nativeElement.style.visibility = 'visible';
    this.loginBox.nativeElement.style.visibility = 'visible';

    const tl = gsap.timeline();

    tl.to(this.loginBox.nativeElement, {
      x: '100%',
      opacity: 0,
      duration: 3,
      ease: 'power3.out'
    });

    tl.fromTo(this.registerBox.nativeElement, {
      x: '-100%',
      opacity: 0
    }, {
      x: '0%',
      opacity: 1,
      duration: 4,
      ease: 'power3.out',
    }, '<');
  }

  animateSwitchToLogin(): void {
    this.registerBox.nativeElement.style.visibility = 'visible';
    this.loginBox.nativeElement.style.visibility = 'visible';

    const tl = gsap.timeline();

    tl.to(this.registerBox.nativeElement, {
      x: '100%',
      opacity: 0,
      duration: 3,
      ease: 'power3.out'
    });

    tl.fromTo(this.loginBox.nativeElement, {
      x: '-100%',
      opacity: 0
    }, {
      x: '0%',
      opacity: 1,
      duration: 4,
      ease: 'power3.out'
    }, '<');
  }

  login(): void {
    if (!this.contact || !this.password) {
      this.errorMessage = 'Email o cellulare e password sono obbligatori.';
      return;
    }

    const credentials = {
      emailOrPhone: this.contact,
      password: this.password,
      rememberMe: this.rememberMe
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.authService.getUserSession().subscribe({
          next: (sessionResponse) => {
            const userId = sessionResponse.userId;

            if (userId) {
              this.authService.getUserRole(userId).subscribe({
                next: (userRoleResponse) => {
                  const role = userRoleResponse.role?.toUpperCase();
                  localStorage.setItem('userRole', role);
                  localStorage.setItem('userId', userId);

                  if (role === 'ADMIN') {
                    this.router.navigate(['/admin']);
                  } else if (role === 'USER') {
                    this.router.navigate(['/area-utente']);
                  } else {
                    this.errorMessage = 'Ruolo utente non riconosciuto.';
                  }
                },
                error: () => {
                  this.errorMessage = 'Errore nel recupero delle informazioni utente.';
                },
              });
            } else {
              this.errorMessage = 'Sessione non valida. Nessun ID utente trovato.';
            }
          },
          error: () => {
            this.errorMessage = 'Sessione non valida.';
          },
        });
      },
      error: (err) => {
        console.error('Errore di login:', err);
        this.errorMessage = 'Credenziali errate o errore di connessione.';
      },
    });
  }
  validateRegisterInput(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,15}$/;

    if (!emailPattern.test(this.registerEmail) && !phonePattern.test(this.registerPhone)) {
      alert('Inserisci un\'email o un numero di telefono valido.');
    }

    if (this.registerPassword !== this.confirmPassword) {
      alert('Le password non coincidono.');
    }
  }

  register(): void {
    this.registerErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: ''
    };

    if (!this.firstName || !this.lastName) {
      this.registerErrors.firstName = 'Nome e Cognome sono obbligatori.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,15}$/;

    if (!emailPattern.test(this.registerEmail)) {
      this.registerErrors.email = 'Inserisci un\'email valida.';
    }

    if (!this.password || !this.confirmPassword) {
      this.registerErrors.confirmPassword = 'Le password sono obbligatorie.';
    }

    if (this.password !== this.confirmPassword) {
      this.registerErrors.confirmPassword = 'Le password non coincidono.';
    }

    if (!this.acceptTerms) {
      this.registerErrors.acceptTerms = 'Devi accettare i termini e le condizioni.';
      return;
    }

    // Se ci sono errori, fermiamo l'esecuzione
    if (Object.values(this.registerErrors).some(error => error)) {
      return;
    }

    // Continua con la logica di registrazione
    const registrationData = {
      name: this.firstName,
      surname: this.lastName,
      email: this.registerEmail,
      phone: this.registerPhone,
      password: this.password,
      passwordConfirmation: this.confirmPassword
    };

    this.authService.register(registrationData).subscribe({
      next: () => {
        alert('Registrazione avvenuta con successo. Ora puoi accedere.');
        this.animateSwitchToLogin();
        this.router.navigate([], {fragment: 'login'});
      },
      error: () => {
        this.registerErrors.email = 'Registrazione fallita. Riprova.';
      }
    });
  }

  forgottenPasswordEmailOrPhone: string = '';

  forgottenPassword(): void {
    if (!this.forgottenPasswordEmailOrPhone) {
      this.errorMessage = 'Email or phone number is required';
      return;
    }

    this.authService.forgottenPassword(this.forgottenPasswordEmailOrPhone).subscribe({
      next: (response) => {
        console.log('Password reset request successful:', response);
        this.errorMessage = 'Password reset instructions have been sent to your email or phone.';
      },
      error: (err) => {
        console.error('Password reset request error:', err);
        this.errorMessage = 'Failed to send password reset instructions. Please try again.';
      }
    });
  }
}
