import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/models/field.model';
import { FieldService } from 'src/app/services/field.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {

  public field ;

  form: FormGroup;

  constructor(private activateRoute : ActivatedRoute,
              private fieldService : FieldService,
              private fb : FormBuilder) { 

    this.activateRoute.params.subscribe(param=>{
                this.fieldService.getField(param['id'])
                          .subscribe((resp:Field)=>{
                            console.log(resp)
                            this.field=resp
                          })
    })
    this.createForm()
  }

  createForm(){
    this.form = this.fb.group({
      sinceDate : [],
      untilDate : []
    })
  }

  search(){
    console.log(this.form.value)
  }
  
}
