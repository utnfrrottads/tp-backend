import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService { 
  apiKey='SnxKXn70COqb4G9JbLru4uAYFDononAR';
  constructor() { }

  getApiKey(){
    return this.apiKey;
  }
}
