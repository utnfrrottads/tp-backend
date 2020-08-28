import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000/api/usuarios/';

  isLoggedIn() {
    if (localStorage.getItem('user') == null) {
      return false;
    } else {
      return true;
    }
  }

  login(user, pass) {
    const URL = this.baseURL + 'login';
    const body = {
      usuario: user,
      password: pass,
    };

    return this.http.post(URL, body, {});
  }

  getUser(id){
    const URL = this.baseURL + id;
    return this.http.get(URL);
  }

  createUser(data: any, tipoUsuario) {
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

  editUser(data: any, tipoUsuario, imageUrl, idUsuario) {
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

  updateStoragedUser(data, URL, tipoUsuario, id) {
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
}
