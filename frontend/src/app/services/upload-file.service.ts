import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor() { }

  //this can be resolve with http request
  async uploadImage(
    file: File | 'no-image',
    type: 'user'|'field',
    id: string){

    try {
      const url=`${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('image',file);

      const resp = await fetch(url,{
        method:'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })
      const data = await resp.json()      
      if(data.ok){
        return data
      }
      else{
        console.log(data.msg)
        return false
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }
}
