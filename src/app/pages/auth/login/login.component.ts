// login.component.ts
import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email e password sono obbligatori';
      return;
    }

    /*this.authService.login(this.email, this.password).subscribe(
      response => {

        localStorage.setItem('authToken', response.token);


        this.router.navigate(['/area-utente']);
      },
      error => {

        this.errorMessage = 'Credenziali errate, riprova.';
      }
    );*/
  }
}
