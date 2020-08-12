import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent  {

  public fields : Field = []

  parameterURL : string;

  constructor(private fieldService : FieldService,
              private activatedRoute : ActivatedRoute) {
                
          this.activatedRoute.params.subscribe(param =>{
                 this.parameterURL = param['search'] || 'Todas'
                });
                this.getFields()
              }


   getFields(){
     if(this.parameterURL === 'Todas'){
            this.fieldService.getFields()
                              .subscribe((resp: any)=>{
                                this.fields = resp 
                              },err=>{
                                console.log(err)
                                Swal.fire("Error","Intentar nuevamente...",'error')
                              })
     }else{
      const param = this.parameterURL
      this.fieldService.getFieldsByParams(this.parameterURL)
                            .subscribe((resp: any)=>{
                              this.fields = resp 
                            },err=>{
                              console.log(err)
                              Swal.fire("Error","Intentar nuevamente...",'error')
                            })
     }
   }

}
