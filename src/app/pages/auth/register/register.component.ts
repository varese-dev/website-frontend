import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule],
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  phone: string = '';
  name: string = '';
  surname: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  //constructor(private authService: AuthService, private router: Router) {}

  register(): void {

    if ((!this.email && !this.phone) || !this.password || !this.name || !this.surname) {
      this.errorMessage = 'Tutti i campi sono obbligatori';
      return;
    }

    // Determina quale campo è stato compilato (email o phoneNumber)
    const userData = {
      name: this.name,
      surname: this.surname,
      password: this.password,
      email: this.email ? this.email : undefined,
      phoneNumber: this.phone ? this.phone : undefined,
    };

    /*Chiamata al servizio di registrazione
    this.authService.register(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registrazione avvenuta con successo!';
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Errore nella registrazione, riprova.';
        console.error(err);
        this.successMessage = '';
      },
    });*/
  }
}
