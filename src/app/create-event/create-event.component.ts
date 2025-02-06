import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateNewEventComponent {
  eventForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      tags: [''],
      talks: [''],
      partnerId: [''],
      sponsorId: ['']
    });
  }

  submitEvent(): void {
    if (this.eventForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi obbligatori.';
      return;
    }

    const {
      title, description, date, address, maxParticipants, tags, talks, partnerId, sponsorId
    } = this.eventForm.value;

    const formattedDate = date + ":00";

    const tagList = tags.split(',').map((tag: string) => ({name: tag.trim()}));
    const talkList = talks.split(',').map((talk: string) => ({title: talk.trim()}));

    this.adminService.createEvent({
      event: {title, description, date: formattedDate, address, maxParticipants, partnerId, sponsorId},
      talks: talkList,
      tags: tagList
    }).subscribe({
      next: (event) => {
        this.successMessage = 'Evento creato con successo!';
        this.eventForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Errore durante la creazione dell’evento.';
        console.error('Error:', error);
      }
    });
  }
}
