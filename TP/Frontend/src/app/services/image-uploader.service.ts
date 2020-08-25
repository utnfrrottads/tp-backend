import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {}

  backendURL = 'http://localhost:3000/api/uploadImage';

  subirImagen(imageFile) {
    let body = new FormData();
    body.append('file', imageFile);
    let options = {};
    return this.http.post<any>(this.backendURL, body, options);
  }
}
