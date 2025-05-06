import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateTagComponent {
  tagForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submitTag(): void {
    if (this.tagForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    this.adminService.createTag(this.tagForm.value).subscribe({
      next: (tag) => {
        this.successMessage = 'Tag creato con successo!';
        this.tagForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Errore durante la creazione del tag.';
        console.error('Error:', error);
      }
    });
  }
}
