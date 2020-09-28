import { Injectable } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';     

@Injectable({
  providedIn: 'root'
})
export class WebSdkMapsService {

  constructor() { }

  getTtMaps(){
    return tt;
  }
}
