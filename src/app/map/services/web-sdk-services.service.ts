import { Injectable } from '@angular/core';
import tt from '@tomtom-international/web-sdk-services';   

@Injectable({
  providedIn: 'root'
})
export class WebSdkServicesService {

  constructor() { }

  getTtServices(){
    return tt;
  }
}
