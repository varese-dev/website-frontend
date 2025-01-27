import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component"; // Importa il file routes

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HeaderComponent, FooterComponent] // Assicurati di importare RouterModule
 // Assicurati di importare RouterModule
 // Assicurati di importare RouterModule
})
export class AppComponent {
  title = 'Varese Developer Group';
}
