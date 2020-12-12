import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  readonly baseURL = environment.backendURL + 'usuarios/';

  saveUser(res): any {
    localStorage.setItem('token', res.token);
    const decoded = jwt_decode(res.token);
    delete decoded['exp'];
    delete decoded['iat'];
    localStorage.setItem('user', JSON.stringify(decoded));
  }

  getToken(): any {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') == null) {
      return false;
    } else {
      return true;
    }
  }

  login(user, pass): Observable<any> {
    const URL = this.baseURL + 'login';
    const body = {
      usuario: user,
      password: pass,
    };
    return this.http.post(URL, body, {});
  }

  getUser(id): Observable<any> {
    const URL = this.baseURL + id;
    return this.http.get(URL);
  }

  createUser(data: any, tipoUsuario): Observable<any> {
    const body = {
      usuario: data.username.value,
      pass: data.pass.value,
      tipo: tipoUsuario,
      cuil: data.cuil.value,
      nombre: data.nombre.value,
      localidad: data.localidad.value,
      direccion: data.direccion.value,
      telefono: data.telefono.value,
      mail: data.email.value,
      url: null,
    };
    return this.http.post(this.baseURL, body, {});
  }

  editUser(data: any, tipoUsuario, imageUrl, idUsuario): Observable<any> {
    const URL = this.baseURL + idUsuario;
    const body = {
      usuario: data.usuario.value,
      pass: data.pass.value,
      tipo: tipoUsuario,
      cuil: data.cuil.value,
      nombre: data.nombre.value,
      localidad: data.localidad.value,
      direccion: data.direccion.value,
      telefono: data.telefono.value,
      mail: data.mail.value,
      url: imageUrl,
    };
    return this.http.put(URL, body, {});
  }

  updateStoragedUser(data, URL, tipoUsuario, id): void {
    const user = {
      _id: id,
      usuario: data.usuario.value,
      pass: data.pass.value,
      tipo: tipoUsuario,
      cuil: data.cuil.value,
      nombre: data.nombre.value,
      localidad: data.localidad.value,
      direccion: data.direccion.value,
      telefono: data.telefono.value,
      mail: data.mail.value,
      url: URL,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
  getLocalUser(): any {
    const user = localStorage.getItem('user');
    if (user == null) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  getEmpresas(): Observable<any> {
    const URL = this.baseURL + 'empresas';
    return this.http.get(URL);
  }
}
