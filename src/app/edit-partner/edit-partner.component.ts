import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AdminService } from '../service/admin.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./edit-partner.component.css']
})
export class EditPartnerComponent implements OnInit {
  partnerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  partnerId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

  ngOnInit(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    this.loadPartnerDetails();
  }

  loadPartnerDetails(): void {
    this.adminService.getAllPartners().subscribe({
      next: (partners) => {
        const partner = partners.find(p => p.id === this.partnerId);
        if (partner) {
          this.partnerForm.patchValue(partner);
        } else {
          this.errorMessage = 'Partner non trovato.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero dei dettagli del partner.';
        console.error('Error fetching partner details:', error);
      }
    });
  }

  submitPartner(): void {
    if (this.partnerForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    this.adminService.updatePartner(this.partnerId, this.partnerForm.value).subscribe({
      next: () => {
        this.successMessage = 'Partner aggiornato con successo!';
      },
      error: (error) => {
        this.errorMessage = 'Errore durante l’aggiornamento del partner.';
        console.error('Error updating partner:', error);
      }
    });
  }
}
