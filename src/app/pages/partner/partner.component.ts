import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerCardService, Partner } from '../../service/partner-card.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
  imports: [CommonModule],
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];

  constructor(
    private router: Router,
    private partnerCardService: PartnerCardService
  ) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerCardService.getPartners().subscribe(
      (data: Partner[]) => {
        this.partners = data;
      },
      (error) => {
        console.error('Errore nel recupero dei partner:', error);
      }
    );
  }

  onDiscoverClick(partnerId: string): void {
    this.router.navigate(['/partner-details', partnerId]);
  }
}
