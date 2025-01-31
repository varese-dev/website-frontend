import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit, OnDestroy {
  
  constructor() {}

  ngOnInit() {
    // Codice da eseguire all'inizializzazione
  }

  ngOnDestroy() {
    // Codice da eseguire alla distruzione del componente
  }
}
