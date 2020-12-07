import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {}

  readonly backendURL = environment.backendURL + 'uploadImage';

  uploadSingreFile(imageFile): Promise<any> {
    const body = new FormData();
    body.append('file', imageFile);
    const options = {};
    return this.http.post<any>(this.backendURL, body, options).toPromise();
  }

  subirImagenes(imagenes): Promise<any> {
    if (imagenes == null) {
      return Promise.resolve(null);
    }
    const promises = [];

    for (const i of imagenes) {
      const p = this.uploadSingreFile(i);
      promises.push(p);
    }

    return Promise.all(promises);
  }
}
