import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RelatoriService, Talk,Event} from '../../../service/relatori.service';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-relatore-detail-component',
  templateUrl: './relatore-detail-component.component.html',
  imports: [
    NgClass,
    NgForOf
  ],
  styleUrls: ['./relatore-detail-component.component.css']
})
export class RelatoreDetailComponent implements OnInit {
  talks: Talk[] = [];
  events: Event[] = [];
  currentIndex = 0;
  currentIndexEvents = 0;
  autoplayInterval: any;

  name: string = '';
  surname: string = '';
  biography: string = '';

  constructor(
    private relatoriService: RelatoriService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.caricaBiografia(id);
        this.loadEvents(id);
      }
    });

    this.loadTalks();
    this.startAutoplay();
  }

  caricaBiografia(id: string): void {
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

  loadTalks() {
    this.relatoriService.getTalks().subscribe(
      (talks: Talk[]) => {
        this.talks = talks;
      },
      (error) => {
        console.error('Errore nel caricamento dei talk:', error);
      }
    );
  }

  loadEvents(id: string) {
    this.relatoriService.getEventsBySpeakerId(id).subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      (error) => {
        console.error('Errore nel caricamento degli eventi:', error);
      }
    );
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.talks.length;
  }

  previousSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.talks.length - 1 : this.currentIndex - 1;
  }

  goToSlide(pageIndex: number) {
    this.currentIndex = pageIndex;
  }

  nextSlide1() {
    if (this.events && this.events.length > 0) {
      this.currentIndexEvents = (this.currentIndexEvents + 1) % this.events.length;
    }
  }


  previousSlide1() {
    this.currentIndexEvents =
      this.currentIndexEvents === 0 ? this.talks.length - 1 : this.currentIndexEvents - 1;
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
    return item.id;
  }



}
