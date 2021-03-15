import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'role');
  }

  addRole(role: any) {
    return this.http.post<any[]>(this.baseUrl + 'role', role);
  }

  updateRole(role: any) {
    return this.http.put<any[]>(this.baseUrl + 'role/' + role._id, role);
  }

  getById(id: any): Observable<any>{
    return this.http.get<any[]>(this.baseUrl + 'role/' + id);
  }

  deleteRole(id: any) {
    return this.http.delete(this.baseUrl + 'role/' + id);
  }
}
