import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  phone: string = '';
  errorMessage: string = '';

  //constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Controlla se almeno email/telefono e password sono stati inseriti
    if ((!this.email && !this.phone) || !this.password) {
      this.errorMessage = 'Email/Telefono e password sono obbligatori';
      return;
    }

    // Determina quale campo utilizzare (email o phoneNumber)
    const credentials = this.email ? { email: this.email } : { phone: this.phone };

    // Verifica che almeno uno tra email o phoneNumber sia presente
    const credential = credentials.email || credentials.phone;
    if (!credential) {
      this.errorMessage = 'Inserisci un\'email o un numero di telefono valido.';
      return;
    }

    /* Chiamata al servizio di login
    this.authService.login(credential, this.password).subscribe({
      next: (response) => {
        this.errorMessage = '';
        console.log(response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Credenziali errate, riprova.';
        console.error(err);
      },
    });*/
  }
}
