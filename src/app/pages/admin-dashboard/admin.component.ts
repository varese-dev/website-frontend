import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {AdminService, Partner, Speaker, Tag, Talk, EventRequest} from '../../service/admin.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardComponent implements OnInit {
  activeTab: string = 'events';
  successMessage: string = '';
  errorMessage: string = '';

  eventForm: FormGroup;
  partnerForm: FormGroup;
  speakerForm: FormGroup;
  tagForm: FormGroup;
  talkForm: FormGroup;

  selectedEventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      partnerId: '',
      sponsorId: '',
      maxParticipants: [0, [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      tags: this.fb.array([]),
      talks: this.fb.array([])
    });

    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', [Validators.required]],
      image: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.speakerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      biography: ['', Validators.required],
      image: ['', Validators.required],
      linkedin: ['', Validators.required]
    });

    this.tagForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.talkForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  get tags(): FormArray {
    return this.eventForm.get('tags') as FormArray;
  }

  get talks(): FormArray {
    return this.eventForm.get('talks') as FormArray;
  }

  addTag(tagName: string): void {
    if (tagName) {
      this.tags.push(this.fb.control(tagName, Validators.required));
    }
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  addTalk(title: string, description: string): void {
    this.talks.push(this.fb.group({
      title: [title, Validators.required],
      description: [description, Validators.required]
    }));
  }

  removeTalk(index: number): void {
    this.talks.removeAt(index);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  /*editEvent(eventId: string): void {
    this.adminService.getEventById(eventId).subscribe({
      next: (event: Event) => {
        this.selectedEventId = eventId;
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          date: event.date,
          maxParticipants: event.maxParticipants,
        });
      },
      error: (error) => this.handleError(error)
    });
  }*/

  submitForm(type: string): void {
    let form: FormGroup;
    let serviceCall: Observable<Event | Partner | Speaker | Tag | Talk>;

    switch (type) {
      case 'event':
        form = this.eventForm;
        // Assicurati che i tags e i talks siano sempre array vuoti se non esistono
        const eventData = form.value;
        console.log('Event Data:', eventData);
        eventData.tags = eventData.tags || [];
        eventData.talks = eventData.talks || [];

        const eventRequest: EventRequest = {
          event: {
            title: eventData.title,
            description: eventData.description,
            date: new Date(eventData.date),
            start: eventData.date,
            end: eventData.date,
            maxParticipants: eventData.maxParticipants,
            address: eventData.address,
            tags: eventData.tags?.map((tag: any) => ({id: null, name: tag})) || [],
            participantsCount: 0,
            talks: eventData.talks?.map((talk: Talk) => ({
              title: talk.title,
              description: talk.description,
            })) || [],
          }
        };


        serviceCall = this.selectedEventId
          ? this.adminService.updateEvent(this.selectedEventId, eventRequest)
          : this.adminService.createEvent(eventRequest);

        break;
      case 'partner':
        form = this.partnerForm;
        serviceCall = this.adminService.createPartner(form.value);
        break;
      case 'speaker':
        form = this.speakerForm;
        serviceCall = this.adminService.createSpeaker(form.value);
        break;
      case 'tag':
        form = this.tagForm;
        serviceCall = this.adminService.createTag(form.value);
        break;
      case 'talk':
        form = this.talkForm;
        serviceCall = this.adminService.createTalk(form.value);
        break;
      default:
        return;
    }

    if (form.invalid) {
      this.errorMessage = 'Compila tutti i campi richiesti.';
      return;
    }

    serviceCall.subscribe({
      next: (response) => this.handleSuccess(type),
      error: (error: any) => this.handleError(error),
    });
  }


  private handleSuccess(type: string): void {
    this.successMessage = `${type.charAt(0).toUpperCase() + type.slice(1)} creato/modificato con successo!`;
    this.errorMessage = '';

    // Resetta il modulo
    switch (type) {
      case 'event':
        this.eventForm.reset();
        this.tags.clear();
        this.talks.clear();
        this.selectedEventId = null; // Reset per creazione nuovo evento
        this.fetchEvents(); // Aggiorna la lista degli eventi
        break;
      case 'partner':
        this.partnerForm.reset();
        break;
      case 'speaker':
        this.speakerForm.reset();
        break;
      case 'tag':
        this.tagForm.reset();
        break;
      case 'talk':
        this.talkForm.reset();
        break;
    }

    // Rimuove il messaggio di successo dopo qualche secondo
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private handleError(error: any): void {
    console.error('Errore:', error);
    if (error instanceof Error) {
      this.errorMessage = `Errore: ${error.message}`;
    } else {
      this.errorMessage = 'Si è verificato un errore. Riprova.';
    }
    setTimeout(() => (this.errorMessage = ''), 5000);
  }

  private fetchEvents(): void {

  }
}
