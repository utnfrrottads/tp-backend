import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from 'src/app/Models/role';

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

  getByIds(roleIds: any[]): Observable<Role[]>{
    const ids: string = roleIds.join(',');
    return this.http.get<any[]>(this.baseUrl + 'role/byIds/' + ids);
  }

  deleteRole(id: any) {
    return this.http.delete(this.baseUrl + 'role/' + id);
  }

  getRoleID(role: string){
    return this.http.get(this.baseUrl + 'role/getRoleID/'+ role)
  }
}
