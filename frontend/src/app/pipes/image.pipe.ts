import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  constructor(private http: HttpClient){

  }

  transform(image: string, type:'user'|'field' ): string {
     if(!image){
        return `${base_url}/uploads/${type}/no-image.png`     
     }
     else if(image.includes('http')){
       return image;
     }
     else if(image){
       return `${base_url}/uploads/${type}/${image}`
     }
     else{
       return `${base_url}/uploads/no-image.png`      
     }
    
  }
}