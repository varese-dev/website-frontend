import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import {RelatoriService} from '../../service/relatori.service';


// Definizione dell'interfaccia per i dati dei relatori
interface Relatore {
  biography: string;
  name: string;
  surname: string;
}

@Component({
  selector: 'talk-relatori',
  templateUrl: './talk-relatori.component.html',
  imports: [NgForOf],
  styleUrls: ['./talk-relatori.component.css']
})
export class TalkRelatoriComponent  {
  /*cards = [
    { image: 'assets/image1.jpg', description: 'Descrizione 1' },
    { image: 'assets/image2.jpg', description: 'Descrizione 2' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image2.jpg', description: 'Descrizione 2' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' },
    { image: 'assets/image3.jpg', description: 'Descrizione 3' }
  ];*/

  // Definisci relatori come array di oggetti del tipo 'Relatore'
  relatori: Relatore[] = [];

  constructor(private relatoriService: RelatoriService) { }

  ngOnInit(): void {
    this.relatoriService.getRelatori().subscribe((data) => {
      this.relatori = data;  // Dati provenienti dall'API
    });
  }
}
