import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  transform(field: any): any {
    if(field.image){
      return field.image
    }else{
      return 'assets/img/no-image.png'
    }
  }
  

}
