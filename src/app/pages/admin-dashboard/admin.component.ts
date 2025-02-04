import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule
  ]
})
export class AdminDashboardComponent {
  activeTab: string = 'events'; // Tab attivo
  successMessage: string = '';
  errorMessage: string = '';

  eventForm: FormGroup;
  partnerForm: FormGroup;
  speakerForm: FormGroup;
  tagForm: FormGroup;
  talkForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    // Form Eventi (già aggiornato in precedenza)
    this.eventForm = this.fb.group({
      title: "",
      description: "",
      date: "",
      partnerId: "",
      sponsorId:"",
      maxParticipants: [0, [Validators.required, Validators.min(1)]],
      address: "",
    });

    // Form Partner (campi aggiornati in base all'entità Partner)
    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required],
      value: ['', Validators.required]
    });

    // Form Speaker (campi aggiornati in base all'entità Speaker)
    this.speakerForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      biography: ['', Validators.required],
      image: ['', Validators.required],
      linkedin: ['', Validators.required]
    });

    // Form Tag (rimane invariato)
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
    });

    // Form Talk (rimane invariato)
    this.talkForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.successMessage = '';
    this.errorMessage = '';
  }

  submitForm(type: string) {
    let form: FormGroup;
    let serviceCall;

    switch (type) {
      case 'event':
        form = this.eventForm;
        serviceCall = this.adminService.createEvent(form.value);
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
      next: () => {
        this.successMessage = `${type.charAt(0).toUpperCase() + type.slice(1)} creato con successo!`;
        this.errorMessage = '';
        form.reset();
      },
      error: (err: Error) => {
        this.errorMessage = `Errore nella creazione di ${type}.`;
        console.error(err);
      }
    });
  }
}
