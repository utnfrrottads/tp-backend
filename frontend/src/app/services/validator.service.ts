import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {



  constructor() { }
  passEqual(pass1 : string, pass2: string){
    return(FormGroup : FormGroup) =>{
      const pass1Control = FormGroup.controls[pass1];
      const pass2Control = FormGroup.controls[pass2];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({notEqual:true})
      }
    }
  }

  
}
