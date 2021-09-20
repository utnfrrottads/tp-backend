import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'branch');
  }

  addBranch(branch: any) {
    return this.http.post<any[]>(this.baseUrl + 'branch', branch);
  }

  updateBranch(branch: any) {
    return this.http.put<any[]>(this.baseUrl + 'branch/' + branch._id, branch);
  }

  getById(id: any): Observable<any>{
    return this.http.get<any[]>(this.baseUrl + 'branch/' + id);
  }

  deleteBranch(id: any) {
    return this.http.delete(this.baseUrl + 'branch/' + id);
  }
}
