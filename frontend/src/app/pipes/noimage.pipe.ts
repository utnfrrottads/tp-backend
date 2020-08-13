import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(field: any): string {
     if(field){
       return `assets/img/${field}`;
     }
     else{
      return 'assets/img/no-image.png';
     }
  }
}