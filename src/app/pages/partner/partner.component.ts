import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerCardService, Partner } from '../../service/partner-card.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];

  // Riferimento al contenitore definito nel template
  @ViewChild('partnersContainer', { static: true }) partnersContainer!: ElementRef;

  constructor(
    private router: Router,
    private partnerCardService: PartnerCardService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerCardService.getPartners().subscribe(
      (data: Partner[]) => {
        // I partner vengono ordinati per ID nel service
        this.partners = data;
        this.renderPartners();
      },
      (error) => {
        console.error('Errore nel recupero dei partner:', error);
      }
    );
  }

  renderPartners(): void {
    const container = this.partnersContainer.nativeElement;

    // Rimuoviamo eventuali elementi già presenti nel container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Creiamo il div che conterrà tutti i partner e aggiungiamo la classe "partners"
    const partnersDiv = this.renderer.createElement('div');
    this.renderer.addClass(partnersDiv, 'partners');

    // Per ogni partner creiamo il relativo markup
    this.partners.forEach(partner => {
      // Creiamo il div che rappresenta il partner
      const partnerDiv = this.renderer.createElement('div');
      this.renderer.addClass(partnerDiv, 'partner');

      // Creiamo l'elemento <img> per il logo
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', '/images/partners/' + partner.image); 
      this.renderer.setAttribute(img, 'alt', partner.name + ' Logo');
      this.renderer.addClass(img, 'partner-logo');

      // Creiamo il bottone "DETTAGLI"
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'discover-button');
      const buttonText = this.renderer.createText('DETTAGLI');
      this.renderer.appendChild(button, buttonText);

      // Assegniamo il listener per il click del bottone
      this.renderer.listen(button, 'click', () => {
        this.onDiscoverClick(partner.id);
      });

      // Aggiungiamo l'immagine e il bottone al div del partner
      this.renderer.appendChild(partnerDiv, img);
      this.renderer.appendChild(partnerDiv, button);

      // Aggiungiamo il div del partner al container "partners"
      this.renderer.appendChild(partnersDiv, partnerDiv);
    });

    // Inseriamo il container "partners" nel contenitore principale
    this.renderer.appendChild(container, partnersDiv);
  }

  onDiscoverClick(partnerId: string): void {
    this.router.navigate(['/partner-details', partnerId]);
  }
}
