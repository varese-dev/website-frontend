import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ForgotPasswordComponent {
  currentStep: number = 1;
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isPasswordTyped: boolean = false;
  isEmailValid: boolean = true;

  constructor(private authService: AuthService) { }

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
