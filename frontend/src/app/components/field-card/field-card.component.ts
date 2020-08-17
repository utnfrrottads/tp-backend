import { Component, OnInit, Input } from '@angular/core';
import { Field } from 'src/app/models/field.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field-card',
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.css']
})
export class FieldCardComponent {

  @Input() field : any ={};
  @Input() id : any;


  constructor(private router : Router) { }

  
   
  
  navigateField(id){
    this.router.navigateByUrl(`/field/${id}`)

  }

}
