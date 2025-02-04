import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaUtenteService, User } from '../../service/area-utente.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// Definizione dell'interfaccia per le slide
interface Slide {
  image: string;
  alt: string;
  title: string;
  date: string;
  location: string;
}

@Component({
  selector: 'app-area-utente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-utente.component.html',
  styleUrls: ['./area-utente.component.css'],
})
export class AreaUtenteComponent implements OnInit, OnDestroy {
  // Inizializzazione dell'oggetto utente
  user: User = { id: '', name: '' };

  // Indice corrente della slide
  currentIndex = 0;

  // Numero di slide da visualizzare contemporaneamente
  slidesPerView = 3;

  // ID dell'intervallo per l'autoplay
  intervalId: any;

  // Array di slide
  slides: Slide[] = [
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 1',
      title: 'Evento 1',
      date: '10 Febbraio 2025',
      location: 'Roma',
    },
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 2',
      title: 'Evento 2',
      date: '12 Marzo 2025',
      location: 'Milano',
    },
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 3',
      title: 'Evento 3',
      date: '20 Aprile 2025',
      location: 'Napoli',
    },
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 4',
      title: 'Evento 4',
      date: '30 Maggio 2025',
      location: 'Firenze',
    },
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 5',
      title: 'Evento 5',
      date: '15 Giugno 2025',
      location: 'Venezia',
    },
    {
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      alt: 'Slide 6',
      title: 'Evento 6',
      date: '25 Luglio 2025',
      location: 'Bologna',
    },
  ];

  constructor(
    private areaUtenteService: AreaUtenteService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  // Metodo chiamato all'inizializzazione del componente
  ngOnInit() {
    this.startAutoPlay();

    // Commentato il codice per il recupero dei dettagli dell'utente
    /*
    this.route.params.subscribe((params) => {
      const userId = params['id'];  // Recupera l'id dell'utente dalla rotta
      const sessionId = this.cookieService.get('sessionId');  // Recupera il sessionId dal cookie
      if (sessionId) {
        this.fetchUserDetails(userId, sessionId);  // Chiamata per ottenere i dettagli dell'utente
      } else {
        console.error('Session ID non trovato');
        this.user = { id: '', name: 'Utente non trovato' };  // Mostra errore se sessionId non è presente
      }
    });
    */
  }

  // Commentato il metodo per il recupero dei dettagli dell'utente
  /*
  fetchUserDetails(userId: string, sessionId: string) {
    this.areaUtenteService.getUserBySessionId(sessionId).subscribe({
      next: (user) => {
        console.log('User data received:', user);
        this.user = user;  // Assegna i dati ricevuti all'oggetto user
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.user = { id: '', name: 'Utente non trovato' };  // Mostra errore in caso di fallimento
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
  */

  // Calcola il numero totale di gruppi per la visualizzazione delle slide
  get totalGroups(): number {
    return Math.ceil(this.slides.length / this.slidesPerView);
  }

  // Funzione per l'autoplay delle slide
  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  // Passa alla slide successiva
  nextSlide() {
    if (this.currentIndex < this.totalGroups - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  // Torna alla slide precedente
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.totalGroups - 1;
    }
  }

  // Vai direttamente alla slide specificata
  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Pulisce l'intervallo quando il componente viene distrutto
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}