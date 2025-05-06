import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');

    if (userRole === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/auth/account']);
    return false;
  }
}
