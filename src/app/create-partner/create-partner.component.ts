import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AdminService } from '../service/admin.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./create-partner.component.css']
})
export class CreatePartnerComponent {
  partnerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.partnerForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      place: [''],
      website: [''],
      email: ['', [Validators.required, Validators.email]],
      image: [''],
      value: ['']
    });
  }

  submitPartner(): void {
    if (this.partnerForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi obbligatori.';
      return;
    }

    this.adminService.createPartner(this.partnerForm.value).subscribe({
      next: (partner) => {
        this.successMessage = 'Partner creato con successo!';
        this.partnerForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Errore durante la creazione del partner.';
        console.error('Error:', error);
      }
    });
  }
}
