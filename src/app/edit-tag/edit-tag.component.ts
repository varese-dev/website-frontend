import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditTagComponent implements OnInit {
  tagForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  tagId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tagId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTagDetails();
  }

  loadTagDetails(): void {
    this.adminService.getAllTags().subscribe({
      next: (tags) => {
        const tag = tags.find(t => t.id === this.tagId);
        if (tag) {
          this.tagForm.patchValue(tag);
        } else {
          this.errorMessage = 'Tag non trovato.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero dei dettagli del tag.';
        console.error('Error fetching tag details:', error);
      }
    });
  }

  submitTag(): void {
    if (this.tagForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    this.adminService.updateTag(this.tagId, this.tagForm.value).subscribe({
      next: () => {
        this.successMessage = 'Tag aggiornato con successo!';
      },
      error: (error) => {
        this.errorMessage = 'Errore durante l’aggiornamento del tag.';
        console.error('Error updating tag:', error);
      }
    });
  }
}
