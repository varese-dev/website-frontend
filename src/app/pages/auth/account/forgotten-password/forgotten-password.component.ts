import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import * as THREE from 'three';
import Lenis from '@studio-freight/lenis';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy, AfterViewInit {
  currentStep: number = 1;
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isPasswordTyped: boolean = false;
  isEmailValid: boolean = true;

  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private animationId: number = 0;
  private lenis!: Lenis;

  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;
  @ViewChild('resetBox') resetBox!: ElementRef;
  @ViewChild('resetLeft') resetLeft!: ElementRef;
  @ViewChild('resetRight') resetRight!: ElementRef;

  constructor(private renderer2: Renderer2, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initLenis();
  }

  ngAfterViewInit(): void {
    this.animateEntrance();
  }

  private initLenis(): void {
    this.lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  private animateEntrance(): void {
    if (!this.resetLeft || !this.resetRight) {
      console.error('Gli elementi non sono stati inizializzati correttamente!');
      return;
    }

    const leftElement = this.resetLeft.nativeElement;
    const rightElement = this.resetRight.nativeElement;

    if (!leftElement || !rightElement) {
      console.error('Elementi ViewChild non trovati!');
      return;
    }

    gsap.set(leftElement, { x: '-100%', opacity: 0 });
    gsap.set(rightElement, { x: '100%', opacity: 0 });

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

  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailPattern.test(this.email);
    if (!this.isEmailValid) {
      console.warn('Formato email non valido.');
    }
  }

  sendEmail() {
    if (!this.email) {
      console.error('Email o numero di telefono obbligatorio.');
      return;
    }

    if (!this.isEmailValid) {
      console.error('Formato email non valido.');
      return;
    }

    this.authService.forgottenPassword(this.email).subscribe({
      next: () => {
        console.log('Codice di verifica inviato con successo.');
        this.currentStep = 2;
      },
      error: (err) => {
        console.error('Errore durante l\'invio del codice:', err.error);
      },
    });
  }

  sendCode() {
    if (!this.verificationCode) {
      console.error('Codice di verifica obbligatorio.');
      return;
    }

    this.authService.verifyCode(this.email, this.verificationCode).subscribe({
      next: () => {
        console.log('Codice di verifica corretto.');
        this.currentStep = 3;
      },
      error: (err) => {
        console.error('Errore nella verifica del codice:', err.error);
      },
    });
  }

  updatePassword() {
    if (!this.newPassword || !this.confirmPassword) {
      console.error('Entrambi i campi della password sono obbligatori.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      console.error('Le password non coincidono.');
      return;
    }

    this.authService.updatePassword(this.email, this.newPassword, this.confirmPassword).subscribe({
      next: () => {
        console.log('Password aggiornata con successo.');
        this.switchToLogin();
      },
      error: (err) => {
        console.error('Errore nell\'aggiornamento della password:', err.error);
      },
    });
  }

  onPasswordInput(): void {
    this.isPasswordTyped = this.newPassword.length > 0;
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  switchToLogin() {
    console.log('Reindirizzamento alla pagina di login.');
  }
}
