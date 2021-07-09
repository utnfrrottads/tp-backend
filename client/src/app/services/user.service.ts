import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Usuario {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /* update(): Usuario {} */

  /* delete(): void {} */

}
