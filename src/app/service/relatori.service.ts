import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Relatore {
  userId: string;
  id: string;
  name: string;
  surname: string;
  biography: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriService {
  private apiUrl = 'http://localhost:8080/speakers';


  constructor(private http: HttpClient) {
  }


  getRelatori(): Observable<Relatore[]> {
    return this.http.get<Relatore[]>(this.apiUrl);
  }

  // Fetch a specific speaker by ID
  getRelatoreById(id: string): Observable<Relatore> {
    const url = this.apiUrl + '/' + id;
    return this.http.get<Relatore>(url);
  }


}
