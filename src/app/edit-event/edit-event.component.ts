import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  eventId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      hostId: [''],
      sponsorId: ['']
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.loadEventDetails();
  }

  loadEventDetails(): void {
  }

  submitEvent(): void {
    if (this.eventForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi obbligatori.';
      return;
    }

    this.adminService.updateEvent(this.eventId, this.eventForm.value).subscribe({
      next: () => {
        this.successMessage = 'Evento aggiornato con successo!';
      },
      error: (error) => {
        this.errorMessage = 'Errore durante l’aggiornamento dell’evento.';
        console.error('Error updating event:', error);
      }
    });
  }
}
