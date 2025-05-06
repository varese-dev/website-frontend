import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-talk',
  templateUrl: './edit-talk.component.html',
  styleUrls: ['./edit-talk.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditTalkComponent implements OnInit {
  talkForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  talkId: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.talkForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.talkId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTalkDetails();
  }

  loadTalkDetails(): void {
    this.adminService.getAllTalks().subscribe({
      next: (talks) => {
        const talk = talks.find(t => t.id === this.talkId);
        if (talk) {
          this.talkForm.patchValue(talk);
        } else {
          this.errorMessage = 'Talk non trovato.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero dei dettagli del talk.';
        console.error('Error fetching talk details:', error);
      }
    });
  }

  submitTalk(): void {
    if (this.talkForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    this.adminService.updateTalk(this.talkId, this.talkForm.value).subscribe({
      next: () => {
        this.successMessage = 'Talk aggiornato con successo!';
      },
      error: (error) => {
        this.errorMessage = 'Errore durante l’aggiornamento del talk.';
        console.error('Error updating talk:', error);
      }
    });
  }
}
