import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http: HttpClient) { }

  uploadImage(imagen: any): any {
    return this.http.post(
      'https://' + environment.API_KEY + ':' + environment.API_SECRET + '@api.cloudinary.com/v1_1/' + environment.CLOUD_NAME + '/image/upload',
      imagen
    );
  }

}
