import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminService} from '../../service/admin.service';

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

interface Booking {
  bookingId: string;
  title: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminDashboardComponent implements OnInit {
  user: User | null = null;
  activeBookings: Booking[] = [];
  otherBookings: Booking[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  name: string = '';
  surname: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  successMessage: string | null = null;
  isEditMode: boolean = false;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;

    this.adminService.fetchUserData().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero dei dati utente.';
        console.error('Error fetching user data:', error);
      },
      complete: () => (this.isLoading = false),
    });

    this.adminService.fetchUserActiveBookings().subscribe({
      next: (data) => {
        this.activeBookings = data.filter(booking => booking.status === 'confirmed');
        this.otherBookings = data.filter(booking => booking.status !== 'confirmed');
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero delle prenotazioni.';
        console.error('Error fetching bookings:', error);
        this.isLoading = false;
      },
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  goToCreateTalk(): void {
    this.router.navigate(['/create-talk']);
  }

  goToCreateEvent(): void {
    this.router.navigate(['/create-event']);
  }

  updateName(): void {
    this.adminService.modifyName(this.name).subscribe({
      next: (message) => this.handleSuccess(message),
      error: (error) => this.handleError(error)
    });
  }

  updateSurname(): void {
    this.adminService.modifySurname(this.surname).subscribe({
      next: (message) => this.handleSuccess(message),
      error: (error) => this.handleError(error)
    });
  }

  updatePassword(): void {
    this.adminService.modifyPassword(this.oldPassword, this.newPassword, this.repeatNewPassword).subscribe({
      next: (message) => this.handleSuccess(message),
      error: (error) => this.handleError(error)
    });
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Sei sicuro di voler cancellare questa prenotazione?')) {
      this.adminService.cancelBooking(bookingId).subscribe({
        next: (message) => {
          this.activeBookings = this.activeBookings.filter(booking => booking.bookingId !== bookingId);
          this.handleSuccess(message);
        },
        error: (error) => this.handleError(error)
      });
    }
  }


  private refreshPage(): void {
    this.adminService.fetchUserData().subscribe({
      next: (data) => {
        this.user = data;
        this.successMessage = 'Dati utente aggiornati con successo.';
      },
      error: (error) => {
        console.error('Errore durante il caricamento dei dati aggiornati:', error);
        this.errorMessage = 'Errore durante il caricamento dei dati aggiornati.';
      }
    });
  }

  private handleSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = null), 5000);
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = 'Errore durante l’aggiornamento dei dati.';
    setTimeout(() => (this.errorMessage = null), 5000);
  }
}
