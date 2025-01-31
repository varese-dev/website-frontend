import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LoginData } from '../../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink, NgIf],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  phone: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  login(): void {
    if ((!this.email && !this.phone) || !this.password) {
      this.errorMessage = 'Inserisci email o telefono e password';
      return;
    }
    const credentials: LoginData = {
      email: this.email || undefined,
      phone: this.phone || undefined,
      password: this.password,
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login riuscito:', response);
        this.router.navigate(['/area-utente']);
      },
      error: (err) => {
        console.error('Errore di login:', err);
        this.errorMessage = 'Credenziali errate o errore di connessione.';
      },
    });
  }
}
