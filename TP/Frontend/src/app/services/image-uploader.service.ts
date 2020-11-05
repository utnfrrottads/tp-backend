import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {}

  readonly backendURL = environment.backendURL + 'uploadImage';

  uploadSingreFile(imageFile) {
    const body = new FormData();
    body.append('file', imageFile);
    const options = {};
    return this.http.post<any>(this.backendURL, body, options).toPromise();
  }

  subirImagenes(imagenes) {
    if (imagenes == null) {
      return Promise.resolve(null);
    }
    const promises = [];
    for (let i = 0; i < imagenes.length; i++) {
      const p = this.uploadSingreFile(imagenes[i]);
      promises.push(p);
    }

    return Promise.all(promises);
  }
}
