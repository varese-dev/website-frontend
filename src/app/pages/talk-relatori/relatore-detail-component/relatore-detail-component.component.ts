import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RelatoriService, Talk, Event, Relatore} from '../../../service/relatori.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-relatore-detail-component',
  templateUrl: './relatore-detail-component.component.html',
  imports: [
    NgClass,
    NgForOf,
    NgIf,


  ],
  styleUrls: ['./relatore-detail-component.component.css']
})
export class RelatoreDetailComponent implements OnInit {
  talks: Talk[] = [];
  events: Event[] = [];
  relatore!: Relatore;
  showLinkedinButton: boolean = false; // Variabile di controllo





  currentIndex = 0;
  currentIndexEvents = 0;


  name: string = '';
  surname: string = '';
  biography: string = '';
  image : string = '';
  linkedin : string | undefined = '';



  constructor(
    private relatoriService: RelatoriService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadBiografia(id);
        this.loadEvents(id);
        this.loadIdRelatore(id);
        this.loadTalks(id);
      }
    });


    this.startAutoplay();

  }

  loadBiografia(id: string): void {
    this.relatoriService.getRelatoreById(id).subscribe(
      (relatore) => {
        if (relatore) {
          this.name = relatore.name;
          this.surname = relatore.surname;
          this.biography = relatore.biography;
          console.log('Biografia caricata:', this.biography);
        } else {
          this.biography = 'Biografia non disponibile.';
        }
      },
      () => {
        this.biography = 'Errore nel caricamento della biografia.';
      }
    );
  }

  loadIdRelatore(id: string): void {
    this.relatoriService.getRelatoreById(id).subscribe(
      (relatore) => {
        if (relatore) {
          this.relatore = relatore;
          this.linkedin = relatore.linkedin;
          this.showLinkedinButton = !!relatore.linkedin;
          this.image = relatore.image;
        }
      },
      () => {
        this.showLinkedinButton = false;
      }
    );
  }




  loadTalks(id: string): void {
    this.relatoriService.getSpeakersByTalkId(id).subscribe(
      (talks: Talk[]) => {
        this.talks = talks;
      },
      () => {
        console.error('Error loading talks');
      }
    );
  }

  loadEvents(id: string) {
    this.relatoriService.getEventsBySpeakerId(id).subscribe(
      (events: Event[]) => {
        console.log('Events loaded:', events);  // Check if events are being loaded
        this.events = events;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.talks.length;
  }


  goToSlide(pageIndex: number) {
    this.currentIndex = pageIndex;
  }

  nextSlide1() {
    if (this.events && this.events.length > 0) {
      this.currentIndexEvents = (this.currentIndexEvents + 1) % this.events.length;
    }
  }


  goToSlide1(pageIndex: number) {
    this.currentIndexEvents = pageIndex;
  }

  startAutoplay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);

    setInterval(() => {
      this.nextSlide1();
    }, 5000);
  }

  trackByFn(index: number, item: any): string {
    return item && item.id ? item.id : index.toString();  // Fallback to index if item.id is undefined
  }


}
