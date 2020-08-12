import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldCardComponent } from './field-card/field-card.component';



@NgModule({
  declarations: [
    FieldCardComponent],
  imports: [
    CommonModule,
    
  ],
  exports:[
    FieldCardComponent
  ]
})
export class ComponentsModule { }
