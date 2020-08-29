import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageUploaderService {
  constructor(private http: HttpClient) {}

  backendURL = 'http://localhost:3000/api/uploadImage';

  uploadSingreFile(imageFile) {
    let body = new FormData();
    body.append('file', imageFile);
    let options = {};
    return this.http.post<any>(this.backendURL, body, options).toPromise();
  }

  subirImagenes(imagenes) {
    if (imagenes == null) {
      return Promise.resolve(null);
    }
    let promises = [];
    for (let i = 0; i < imagenes.length; i++) {
      let p = this.uploadSingreFile(imagenes[i]);
      promises.push(p);
    }

    return Promise.all(promises);
  }
}
