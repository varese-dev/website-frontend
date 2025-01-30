import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RelatoriService} from '../../../service/relatori.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-relatore-detail',
  templateUrl: './relatore-detail-component.component.html',
  styleUrls: ['./relatore-detail-component.component.css'],
  imports: [CommonModule]
})
export class RelatoreDetailComponent implements OnInit {
  id!: string;
  biography!: string;
  name!: string;
  surname!: string;


  constructor(
    private route: ActivatedRoute,
    private relatoriService: RelatoriService
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.caricaBiografia();
    });
  }

  caricaBiografia(): void {
    this.relatoriService.getRelatoreById(this.id).subscribe(
      (relatore) => {
        console.log('Relatore recuperato:', relatore);  // Log per verificare i dati
        if (relatore) {
          this.name = relatore.name;            // Imposta il nome
          this.surname = relatore.surname;      // Imposta il cognome
          this.biography = relatore.biography;  // Imposta la biografia
        } else {
          console.error('Relatore non trovato!');
          this.biography = 'Biografia non disponibile.';
        }
      },
      (error) => {
        console.error('Errore nel caricamento della biografia:', error);
        this.biography = 'Errore nel caricamento della biografia.';
      }
    );
  }


}
