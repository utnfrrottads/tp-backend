import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'note');
  }

  addNote(note: any) {
    return this.http.post<any[]>(this.baseUrl + 'note', note);
  }

  updateNote(note: any) {
    return this.http.put<any[]>(this.baseUrl + 'note/' + note._id, note);
  }

  getById(id: any): Observable<any>{
    return this.http.get<any[]>(this.baseUrl + 'note/' + id);
  }

  deleteNote(id: any) {
    return this.http.delete(this.baseUrl + 'note/' + id);
  }
}
