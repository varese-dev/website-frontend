import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../../components/event-card/event-card.component";
import {PartnerComponent} from "../../components/partner/partner.component"
import { FinalMessageComponent } from "../../components/final-message/final-message.component";
import { AboutComponent } from "../../components/about/about.component";
import { HeroComponent } from "../../components/hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [EventCardComponent, PartnerComponent, FinalMessageComponent, AboutComponent, HeroComponent],  
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Logica opzionale per il componente Home
  }
}






