import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AreaUtenteService} from '../service/area-utente.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-talk',
  templateUrl: './create-talk.component.html',
  styleUrls: ['./create-talk.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateTalkComponent {
  talkForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private areaUtenteService: AreaUtenteService) {
    this.talkForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['']
    });
  }

  submitTalk(): void {
    if (this.talkForm.invalid) {
      this.errorMessage = 'Compila correttamente tutti i campi.';
      return;
    }

    const { title, description, tags } = this.talkForm.value;
    const tagNames = tags.split(',').map((tag: string) => tag.trim());

    this.areaUtenteService.createTalk({
      talk: { title, description },
      tagNames
    }).subscribe({
      next: (talk) => {
        this.successMessage = 'Talk creato con successo!';
        this.talkForm.reset();
      },
      error: (error) => {
        this.errorMessage = 'Errore durante la creazione del talk.';
        console.error('Error:', error);
      }
    });
  }
}
