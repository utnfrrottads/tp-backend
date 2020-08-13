import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  public fields : Field = []
  param :string
  query : string = ""

  constructor(private fieldService : FieldService,
              private activatedRoute : ActivatedRoute) {}

   ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe(param =>{
        this.query = param['search'] || ''
        this.getFields()
       })
       
    }

   
   getFields(){
      if(this.query === ''){
        this.param = 'Todas'
      }else{
        this.param = this.query
      }

      this.fieldService.getFields(this.query)
                            .subscribe((resp: any)=>{
                              this.fields = resp 
                            },err=>{
                              console.log(err)
                              Swal.fire("Error","Intentar nuevamente...",'error')
                            })
      
     }
  
}
