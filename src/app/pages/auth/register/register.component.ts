import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  phone: string = '';
  name: string = '';
  surname: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if ((!this.email && !this.phone) || !this.password || !this.name || !this.surname) {
      this.errorMessage = 'Tutti i campi sono obbligatori';
      return;
    }

    const userData = {
      name: this.name,
      surname: this.surname,
      password: this.password,
      email: this.email ? this.email : undefined,
      phone: this.phone ? this.phone : undefined,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registrazione avvenuta con successo!';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {

        if (err.status === 400) {
          this.errorMessage = 'Dati di registrazione non validi. Riprova.';
        } else if (err.status === 409) {
          this.errorMessage = 'Un account con questa email o numero di telefono esiste già.';
        } else {
          this.errorMessage = 'Errore nella registrazione, riprova.';
        }
        this.successMessage = '';
      },
    });
  }
}
