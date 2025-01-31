import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../../components/event-card/event-card.component";
import {PartnerComponent} from "../../components/partner/partner.component"

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [EventCardComponent, PartnerComponent],  
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Logica opzionale per il componente Home
  }
}
