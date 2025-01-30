import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../../components/event-card/event-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [EventCardComponent],  
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Logica opzionale per il componente Home
  }
}
